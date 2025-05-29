import express from "express";

import{
    getAllQuizsets,
    getQuizsetById,
    createQuizset
} from "../controllers/PracticeQuizController.js";

const router=express.Router();

router.get('/',getAllQuizsets);

router.get('/:id',getQuizsetById);

router.post('/',createQuizset);

export default router;
