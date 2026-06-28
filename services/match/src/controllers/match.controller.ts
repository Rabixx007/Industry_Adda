import { z } from 'zod';
import { Request, Response } from 'express';
import pool from '../config/db';
import { Kafka } from 'kafkajs';

const kafka = new Kafka({ brokers: [process.env.KAFKA_BROKER || 'kafka:9092'] });
const producer = kafka.producer();
const swipeSchema = z.object({
  targetId: z.string().uuid(),
  direction: z.enum(['left', 'right'])
});


export async function swipe(req: Request, res: Response) {
  const parsed = swipeSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: 'Invalid input' }); return; }
  const { targetId, direction } = parsed.data;
  const swiperId = (req as any).userId;

  try {
    await pool.query(
      `INSERT INTO swipes(swiper_id, target_id, direction) VALUES($1,$2,$3) ON CONFLICT DO NOTHING`,
      [swiperId, targetId, direction]
    );

    if (direction === 'right') {
      const mutual = await pool.query(
        `SELECT id FROM swipes WHERE swiper_id=$1 AND target_id=$2 AND direction='right'`,
        [targetId, swiperId]
      );
      if (mutual.rows.length > 0) {
        const [user1Id, user2Id] = swiperId < targetId ? [swiperId, targetId] : [targetId, swiperId];

        await pool.query(
          `INSERT INTO matches(user1_id, user2_id) VALUES($1,$2) ON CONFLICT DO NOTHING`,
          [user1Id, user2Id]
        );
        await producer.connect();
        await producer.send({
          topic: 'user.matched',
          messages: [{ value: JSON.stringify({ user1: swiperId, user2: targetId }) }]
        });
        await producer.disconnect();
        res.json({ matched: true });
        return;
      }
    }
    res.json({ matched: false });
  } catch (err) {
    res.status(500).json({ error: 'Swipe failed' });
  }
}

export async function getMatches(req: Request, res: Response) {
  const userId = (req as any).userId;
  try {
    const result = await pool.query(
      `SELECT * FROM matches WHERE user1_id=$1 OR user2_id=$1`,
      [userId]
    );
    res.json(result.rows);
  } catch {
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
}
