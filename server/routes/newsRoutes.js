import React from "react";
import express from "express";

import { getAllNews,createNews } from "../controllers/newsController.js";

const router=express.Router();

//get all news
router.get('/',getAllNews);

router.post('/',createNews);

export default router;