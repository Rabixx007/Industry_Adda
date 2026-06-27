import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { pubClient, subClient, connectRedis } from './config/redis';
import { authenticateSocket } from './middleware/auth';
import pool from './config/db';
import { getConversation } from './controllers/message.controller';
import jwt from 'jsonwebtoken';
import { authenticate } from './middleware/auth';
import rateLimit from 'express-rate-limit';
import { Kafka } from 'kafkajs';


const app = express();
app.use(express.json());


const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

// REST route
app.get('/api/messages/:userId', authenticate, getConversation);

app.get('/health', (_, res) => res.json({ status: 'ok' }));

io.use(authenticateSocket);

io.on('connection', (socket) => {
  const userId = (socket as any).userId;
  socket.join(userId); // each user joins a room named by their userId

  socket.on('send_message', async ({ receiverId, content }) => {
    try {
      const result = await pool.query(
        `INSERT INTO messages(sender_id, receiver_id, content) VALUES($1,$2,$3) RETURNING *`,
        [userId, receiverId, content]
      );
      const message = result.rows[0];
      io.to(receiverId).emit('new_message', message); // deliver to receiver
      socket.emit('new_message', message);            // echo to sender
    } catch (err) {
      socket.emit('error', 'Message failed');
    }
  });
});

async function start() {
  await connectRedis();
  io.adapter(createAdapter(pubClient, subClient));

  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      sender_id UUID NOT NULL,
      receiver_id UUID NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  const PORT = process.env.MESSAGING_PORT || 3002;

  const kafka = new Kafka({ brokers: [process.env.KAFKA_BROKER || 'kafka:9092'] });
  const consumer = kafka.consumer({ groupId: 'messaging-group' });
  await consumer.connect();
  await consumer.subscribe({ topic: 'user.matched', fromBeginning: false });
  await consumer.run({
    eachMessage: async ({ message }) => {
      const { user1, user2 } = JSON.parse(message.value!.toString());
      io.to(user1).emit('matched', { with: user2 });
      io.to(user2).emit('matched', { with: user1 });
    }
  });

  httpServer.listen(PORT, () => console.log(`Messaging service on ${PORT}`));
}

start();
