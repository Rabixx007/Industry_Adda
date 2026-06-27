import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { createTables } from './config/schema';
import { connectRedis } from './config/redis';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import projectRoutes from './routes/project.routes';
import searchRoutes from './routes/search.routes';




dotenv.config({ path: __dirname + '/../.env' });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'core' });
});

const start = async () => {
  await connectDB();
  await createTables();
  await connectRedis();
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/projects', projectRoutes);
  app.use('/api/search', searchRoutes);



  app.listen(PORT, () => {
    console.log(`Core service running on port ${PORT}`);
  });
};


start();