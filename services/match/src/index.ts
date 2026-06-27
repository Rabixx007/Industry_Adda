import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
import express from 'express';
import pool from './config/db';
import { authenticate } from './middleware/auth';
import { swipe, getMatches } from './controllers/match.controller';
import rateLimit from 'express-rate-limit';

const app = express();
app.use(express.json());
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

app.get('/health', (_, res) => res.json({ status: 'ok' }));
app.post('/api/match/swipe', authenticate, swipe);
app.get('/api/match/matches', authenticate, getMatches);

async function start() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS swipes (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      swiper_id UUID NOT NULL,
      target_id UUID NOT NULL,
      direction VARCHAR(5) NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(swiper_id, target_id)
    );
    CREATE TABLE IF NOT EXISTS matches (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user1_id UUID NOT NULL,
      user2_id UUID NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(user1_id, user2_id)
    );
  `);

  const PORT = process.env.MATCH_PORT || 3003;
  app.listen(PORT, () => console.log(`Match service on ${PORT}`));
}

start();
