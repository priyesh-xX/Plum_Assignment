import {pool} from "../db/db.js";

//get all quizzes
export const getAllQuizsets=async(req,res)=>{
    try{
        const result=await pool.query("SELECT * FROM practice_quizzes ORDER BY uploaded_at DESC");//latest
        res.status(200).json(result.rows);//ok(returned)
    }catch(error){
        console.error("Error fetching quizsets",error);
        res.status(500).json({error:"Internal server error"});
    }
};

export const getQuizsetById= async(req,res)=>{
    const id= parseInt(req.params.id); //extract from url
    try{
        const result=await pool.query("SELECT * FROM practice_quizzes WHERE id=$1",[id]);
        if(result.rows.length===0){
            return res.status(404).json({error:"Quizset not found"});
        }
        res.status(200).json(result.rows[0]);//OK
    }catch(error){
        console.error("Error fetching quizset by ID:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const createQuizset= async(req,res)=>{
    const {title,topic,file_url,description}= req.body;
    try{
        const result = await pool.query(
            "INSERT INTO practice_quizzes (title,topic,file_url,description) VALUES ($1,$2,$3,$4) RETURNING *",
            [title,topic,file_url,description]
        );
        res.status(201).json(result.rows[0]);
    }catch(err){
        console.error("Error creating",err);
        res.status(500).json({error:"Internal server error"});
    }
};


