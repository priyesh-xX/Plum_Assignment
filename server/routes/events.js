import express from "express";
import {getUpcomingEvents,registerForEvent,createEvent,updateEvent } from "../controllers/eventController.js";

import { verifyAdmin,verifyUser } from "../middleware/auth.js";

const router=express.Router();

router.get("/",getUpcomingEvents);
router.post("/register",verifyUser,registerForEvent);

//admin only
router.post('/create', verifyAdmin, createEvent);

router.put("/:id",verifyAdmin,updateEvent);

export default router;
