import { Router } from 'express';
import { createProject, getMyProjects, getUserProjects, deleteProject } from '../controllers/project.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/', authenticate, createProject);
router.get('/me', authenticate, getMyProjects);
router.get('/user/:userId', authenticate, getUserProjects);
router.delete('/:id', authenticate, deleteProject);

export default router;