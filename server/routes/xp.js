import express from "express";
import { getUserXP,updateUserXP,getLeaderboard } from "../controllers/xpController.js";

const router=express.Router();

//static route first
router.get("/leaderboard",getLeaderboard);
//dynamic routes
router.get('/:id',getUserXP);
router.put('/:id',updateUserXP);



export default router;