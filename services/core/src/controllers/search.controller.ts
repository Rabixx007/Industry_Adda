import { Response } from 'express';
import { pool } from '../config/db';
import { AuthRequest } from '../middleware/auth';


export const searchUsers = async (req: AuthRequest, res: Response) => {
  const { q, skills } = req.query;
  const skillList = skills ? String(skills).split(',').map(s => s.trim()).filter(Boolean) : [];
  if (!q && skillList.length === 0) {
    return res.status(400).json({ error: 'Query or skills required' });
  }
  try {
    const params: any[] = [req.userId];
    const clauses: string[] = ['id != $1'];

    if (q) {
      params.push(`%${q}%`);
      clauses.push(`(name ILIKE $${params.length} OR COALESCE(bio, '') ILIKE $${params.length})`);
    }
    if (skillList.length > 0) {
      params.push(skillList);
      clauses.push(`skills && $${params.length}::text[]`);
    }

    const result = await pool.query(
      `SELECT id, name, bio, skills, avatar FROM users
       WHERE ${clauses.join(' AND ')}
       LIMIT 20`,
      params
    );
    res.json({ users: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};