import { Router } from 'express';
import { getMe, updateProfile, getUserById } from '../controllers/user.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/me', authenticate, getMe);
router.put('/me', authenticate, updateProfile);
router.get('/:id', authenticate, getUserById);

export default router;