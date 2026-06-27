import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db';
import { redisClient } from '../config/redis';
import { AuthRequest } from '../middleware/auth';



export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        const exists = await pool.query('SELECT id FROM users WHERE email=$1', [email]);
        if (exists.rows.length) return res.status(400).json({ error: 'Email already registered' });

        const hash = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
            [name, email, hash]
        );

        const token = jwt.sign(
            { userId: result.rows[0].id },
            process.env.JWT_SECRET!,
            { expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as any }
        ); res.status(201).json({ token, user: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
        const user = result.rows[0];
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign(
            { userId: result.rows[0].id },
            process.env.JWT_SECRET!,
            { expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as any }
        ); res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const logout = async (req: AuthRequest, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) { res.status(400).json({ error: 'No token' }); return; }
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { exp: number };
  const ttl = decoded.exp - Math.floor(Date.now() / 1000);
  await redisClient.setEx(`blacklist:${token}`, ttl, 'true');
  res.json({ message: 'Logged out' });
};