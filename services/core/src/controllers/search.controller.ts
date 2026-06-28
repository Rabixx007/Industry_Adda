import { Response } from 'express';
import { pool } from '../config/db';
import { AuthRequest } from '../middleware/auth';

export const searchUsers = async (req: AuthRequest, res: Response) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Query required' });

  try {
    const result = await pool.query(
      `SELECT id, name, bio, skills, avatar FROM users
   WHERE (name ILIKE $1 OR COALESCE(bio, '') ILIKE $1)
   AND id != $2
   LIMIT 20`,
      [`%${q}%`, req.userId]
    );
    res.json({ users: result.rows });
    res.json(result.rows);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};