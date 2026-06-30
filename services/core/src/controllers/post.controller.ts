import { Response } from 'express';
import { pool } from '../config/db';
import { AuthRequest } from '../middleware/auth';

export const createPost = async (req: AuthRequest, res: Response) => {
  const { content } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
  if (!content && !imageUrl) {
    return res.status(400).json({ error: 'Post must have content or an image' });
  }
  try {
    const result = await pool.query(
      `INSERT INTO posts (user_id, content, image_url)
       VALUES ($1, $2, $3) RETURNING *`,
      [req.userId, content || null, imageUrl]
    );
    res.status(201).json({ post: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getFeed = async (req: AuthRequest, res: Response) => {
  const cursor = req.query.cursor as string | undefined;
  const limit = 10;
  try {
    const result = await pool.query(
      `SELECT p.*, u.name, u.avatar,
        (SELECT COUNT(*) FROM post_likes WHERE post_id = p.id) AS like_count,
        (SELECT COUNT(*) FROM post_likes WHERE post_id = p.id AND user_id = $1) > 0 AS liked_by_me,
        (SELECT COUNT(*) FROM comments WHERE post_id = p.id) AS comment_count
       FROM posts p
       JOIN users u ON u.id = p.user_id
       WHERE ($2::timestamp IS NULL OR p.created_at < $2)
       ORDER BY p.created_at DESC
       LIMIT $3`,
      [req.userId, cursor || null, limit]
    );
    const posts = result.rows;
    const nextCursor = posts.length === limit ? posts[posts.length - 1].created_at : null;
    res.json({ posts, nextCursor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const toggleLike = async (req: AuthRequest, res: Response) => {
  try {
    const existing = await pool.query(
      'SELECT id FROM post_likes WHERE user_id=$1 AND post_id=$2',
      [req.userId, req.params.id]
    );
    if (existing.rows.length) {
      await pool.query('DELETE FROM post_likes WHERE id=$1', [existing.rows[0].id]);
      res.json({ liked: false });
    } else {
      await pool.query(
        'INSERT INTO post_likes (user_id, post_id) VALUES ($1, $2)',
        [req.userId, req.params.id]
      );
      res.json({ liked: true });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const addComment = async (req: AuthRequest, res: Response) => {
  const { content } = req.body;
  if (!content || !content.trim()) {
    return res.status(400).json({ error: 'Comment cannot be empty' });
  }
  try {
    const result = await pool.query(
      `INSERT INTO comments (user_id, post_id, content)
       VALUES ($1, $2, $3) RETURNING *`,
      [req.userId, req.params.id, content]
    );
    const withUser = await pool.query(
      `SELECT c.*, u.name, u.avatar FROM comments c JOIN users u ON u.id = c.user_id WHERE c.id = $1`,
      [result.rows[0].id]
    );
    res.status(201).json({ comment: withUser.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getComments = async (req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT c.*, u.name, u.avatar FROM comments c
       JOIN users u ON u.id = c.user_id
       WHERE c.post_id = $1 ORDER BY c.created_at ASC`,
      [req.params.id]
    );
    res.json({ comments: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deletePost = async (req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query(
      'DELETE FROM posts WHERE id=$1 AND user_id=$2 RETURNING id',
      [req.params.id, req.userId]
    );
    if (!result.rows.length) return res.status(404).json({ error: 'Post not found or not yours' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};