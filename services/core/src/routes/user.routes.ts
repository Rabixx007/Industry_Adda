import { Router } from 'express';
import { getMe, updateProfile, getUserById, discoverUsers } from '../controllers/user.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/me', authenticate, getMe);
router.put('/me', authenticate, updateProfile);
router.get('/discover', authenticate, discoverUsers);
router.get('/:id', authenticate, getUserById);

export default router;