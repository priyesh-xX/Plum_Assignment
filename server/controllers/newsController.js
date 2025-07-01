import {pool} from "../db/db.js";

export const getAllNews=async(req,res)=>{
    try{
        const result= await pool.query("SELECT* FROM news ORDER BY date DESC LIMIT 10");
        res.status(200).json(result.rows);
    }catch(err){
        console.error("ERROR fetchign news",err);
        res.status(500).json({message:"Error fetching news"});
    }
};

//POST new news item
export const createNews=async(req,res)=>{
    const {title,content} = req.body;
    try{
        const result=await pool.query(
            "INSERT INTO news(title,content) VALUES($1,$2) RETURNING*",
            [title,content]
        );
        res.status(201).json(result.rows[0]);
    }catch(err){
        console.error("ERROR creating news",err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

