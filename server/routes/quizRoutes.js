import express from 'express';
import { quizHandler } from '../controllers/quizController.js';

const router = express.Router();

// Keep GET so frontend doesn't change
router.get('/challenge', quizHandler);

export default router;