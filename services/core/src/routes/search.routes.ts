import { Router } from 'express';
import { searchUsers } from '../controllers/search.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, searchUsers);

export default router;