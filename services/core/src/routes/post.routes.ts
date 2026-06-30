import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { createPost, getFeed, toggleLike, addComment, getComments, deletePost } from '../controllers/post.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../uploads'),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files allowed'));
  }
});

router.post('/', authenticate, upload.single('image'), createPost);
router.get('/feed', authenticate, getFeed);
router.post('/:id/like', authenticate, toggleLike);
router.get('/:id/comments', authenticate, getComments);
router.post('/:id/comments', authenticate, addComment);
router.delete('/:id', authenticate, deletePost);


export default router;