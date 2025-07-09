import React from "react";
import express from "express";

import { getAllNews,createNews } from "../controllers/newsController.js";
import { verifyAdmin } from "../middleware/auth.js";

const router=express.Router();

//get all news
router.get('/',getAllNews);

router.post('/',verifyAdmin,createNews);

export default router;