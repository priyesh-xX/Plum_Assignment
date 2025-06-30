import {pool} from "../db/db.js";

export const getUserXP = async(req,res)=>{
    const userId= req.params.id;
    try{
        const result= await pool.query("SELECT* FROM user_xp WHERE user_id=$1",[userId]);
        if(result.rows.length===0){
            return res.status(404).json({message:"XP record not found"});
        }
        return res.status(200).json(result.rows[0]);
    }catch(err){
        console.error("Error fetching user XP:",err);
        res.status(500).json({error:"Internal Server Error"});
    }
};

// export const getUserXp = async (req, res) => {
//     const userId=req.params.id;
//     try{
//         const userResult=await pool.query("SELECT* FROM users WHERE user_id=$1",[userId]);
//         if(userResult.rows.length===0){
//             return res.status(404).json({message:"User not found"});
//         }
//         const user=userResult.rows[0];
//         //fetch xp and level
//         const XpResult= await pool.query("SELECT xp,level FROM user_xp WHERE user_id=$1",[userId]);
//         if(XpResult.rows.length > 0){
//             user.xp=XpResult.rows[0].xp;
//             user.level=XpResult.rows[0].level;
//         }else{
//             user.xp=0;
//             user.level=1;
//         }
//         res.status(200).json(user);
//     }catch(err){
//         console.error("Error fetching xp",err);
//         res.status(500).json({error:"INTERNAL SERVER ERROR"});
//     }
// };

//Update 
export const updateUserXP = async(req,res)=>{
    const userId=req.params.id;
    const {xpGained}=req.body;
    try{
        const user= await pool.query("SELECT* FROM user_xp WHERE user_id=$1",[userId]);
        if(user.rows.length===0){//user doesnt exist
            //new record
            await pool.query("INSERT INTO user_xp(user_id,xp,level) VALUES($1,$2,$3)",[userId,xpGained,1]);
            return res.status(201).json({message:"New user XP created and added"});
        }
        const currentXP= user.rows[0].xp + xpGained;//add new xp to existing xp
        const newLevel = Math.floor(currentXP / 100)+1;
        //make updates in database
        const update= await pool.query(
            "UPDATE user_xp SET xp=$1,level=$2 WHERE user_id=$3 RETURNING*",[currentXP,newLevel,userId]
        );
        res.status(200).json(update.rows[0]);//send updated xp and level back to client
    }catch(err){
        console.log("Error updating user XP",err);
        res.status(500).json({error:"INTERNAL server Error"});
    }
};

export const getLeaderboard= async(req,res)=>{
    try{
        const result = await pool.query(`
            SELECT users.id,users.username,user_xp.xp,user_xp.level
            FROM user_xp
            JOIN users on users.id=user_xp.user_id
            ORDER BY user_xp.xp DESC
            LIMIT 10`  //top 10
        );
        res.json(result.rows);
    }catch(err){
        console.error("Error fetching leaderboard",err);
        res.status(500).json({error:"Failed to fetch leaderboard"});
    }
};

