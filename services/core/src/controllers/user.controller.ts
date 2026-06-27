import { Request, Response } from 'express';
import { pool } from '../config/db';
import { AuthRequest } from '../middleware/auth';

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, bio, skills, github, linkedin, avatar, created_at FROM users WHERE id=$1',
      [req.userId]
    );
    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  const { name, bio, skills, github, linkedin, avatar } = req.body;
  try {
    const result = await pool.query(
      `UPDATE users SET name=$1, bio=$2, skills=$3, github=$4, linkedin=$5, avatar=$6
       WHERE id=$7 RETURNING id, name, email, bio, skills, github, linkedin, avatar`,
      [name, bio, skills, github, linkedin, avatar, req.userId]
    );
    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT id, name, bio, skills, github, linkedin, avatar FROM users WHERE id=$1',
      [req.params.id]
    );
    if (!result.rows.length) return res.status(404).json({ error: 'User not found' });
    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};