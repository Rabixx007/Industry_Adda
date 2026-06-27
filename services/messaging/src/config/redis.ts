import { createClient } from 'redis';

export const pubClient = createClient({ url: process.env.REDIS_URL });
export const subClient = pubClient.duplicate();

export async function connectRedis() {
  await pubClient.connect();
  await subClient.connect();
}
