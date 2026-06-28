import { Request, Response } from 'express';
import pool from '../config/db';

export async function getConversation(req: Request, res: Response) {
  const me = (req as any).userId;
  const other = req.params.userId;
  try {
    const result = await pool.query(
      `SELECT * FROM messages 
       WHERE (sender_id=$1 AND receiver_id=$2) OR (sender_id=$2 AND receiver_id=$1)
       ORDER BY created_at ASC`,
      [me, other]
    );
    res.json({ messages: result.rows });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
}
