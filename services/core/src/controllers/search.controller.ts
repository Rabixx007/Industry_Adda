import { Response } from 'express';
import { pool } from '../config/db';
import { AuthRequest } from '../middleware/auth';

export const searchUsers = async (req: AuthRequest, res: Response) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Query required' });

  try {
    const result = await pool.query(
      `SELECT id, name, bio, skills, avatar FROM users
       WHERE to_tsvector('english', name || ' ' || COALESCE(bio, '') || ' ' || COALESCE(array_to_string(skills, ' '), ''))
       @@ plainto_tsquery('english', $1)
       AND id != $2
       LIMIT 20`,
      [q, req.userId]
    );
    res.json(result.rows);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};