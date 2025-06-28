import express from 'express';
import { getChallengeQuestions } from '../controllers/quizController.js';

const router = express.Router();

router.get('/challenge', getChallengeQuestions);

export default router;
