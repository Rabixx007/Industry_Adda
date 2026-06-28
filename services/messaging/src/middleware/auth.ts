import { Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export function authenticateSocket(socket: Socket, next: (err?: Error) => void) {
  const token = socket.handshake.auth.token || socket.handshake.headers.cookie?.split('token=')[1]?.split(';')[0];
  if (!token) return next(new Error('No token'));
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    (socket as any).userId = payload.userId;
    next();
  } catch {
    next(new Error('Invalid token'));
  }
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.token;
  if (!token) { res.status(401).json({ error: 'No token' }); return; }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    (req as any).userId = payload.userId;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}