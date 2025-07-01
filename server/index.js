import express from "express";
import cors from"cors";
import dotenv from "dotenv";
import {pool} from "./db/db.js"

//import quizRoutes from "./routes/quiz.js";
// import quizRoutes from "./routes/quiz.js";
import userRoutes from "./routes/user.js";
import practiceQuizRoutes from "./routes/practiceQuiz.js";
import xpRoutes from "./routes/xp.js";
import quizRoutes from "./routes/quizRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import stripeRoutes from "./routes/stripeRoutes.js";

//loading env variables
dotenv.config();


const app=express();
const PORT=process.env.PORT; //get the one stored in .env file

//middleware
app.use(cors());
app.use(express.json());

//app.use(express.urlencoded({extended:true}));

//Test route
app.get('/',(req,res)=>{
    res.send('Server is running ');
})


//dummy route
app.get('/api/Test',(req,res)=>{
    res.json({message: "this is a test"});
})

//app.use('/api/quiz',quizRoutes);

app.use('/api/quiz', quizRoutes);
// “For every request that starts with /api/quiz, use the routes defined in quizRoutes.”
app.use('/api/users',userRoutes);

app.use('/api/practice',practiceQuizRoutes);

app.use('/api/xp',xpRoutes);

app.use('/api/news',newsRoutes);
app.use("/api/stripe", stripeRoutes);


//404 handler (unknown route)
app.use((req,res)=>{
    res.status(404).json({error:"Route not found"});    
})
//Global error
app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).json({error: "Internal Server Error"});
});

app.listen(PORT,()=>{
    console.log(`Server running at: http://localhost:${PORT}`);
})