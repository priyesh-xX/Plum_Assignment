import {pool} from "../db/db.js";

//get all users
export const getAllUsers= async(req,res)=>{
    try{
        const result= await pool.query('SELECT * FROM users');
        res.json(result);//send back once fetched
    }catch(error){
        console.log(error);
        res.status(500).json({error:'Internal server error'});
    }
}



//get a single user by id
// export const getUserById = async(req,res)=>{
//     const {id}=req.params; //reads id from URL
//     try{
//         const result=await pool.query('SELECT * FROM users WHERE id=$1',[id]);

//         if(result.rows.length === 0) { //if no user found with this id
//             return res.status(404).json({ error: "User not found" });
//         }

//         res.json(result.rows[0]);//return first one
//     }catch(error){
//         console.log(error);
//         res.status(500).json({error:'Internal server error'});
//     }

// }

//USER with XP
export const getUserById = async (req, res) => {
    const userId=req.params.id;
    try{
        const userResult=await pool.query("SELECT* FROM users WHERE id=$1",[userId]);
        if(userResult.rows.length===0){
            return res.status(404).json({message:"User not found"});
        }
        const user=userResult.rows[0];
        //fetch xp and level
        const XpResult= await pool.query("SELECT xp,level FROM user_xp WHERE user_id=$1",[userId]);
        if(XpResult.rows.length > 0){
            user.xp=XpResult.rows[0].xp;
            user.level=XpResult.rows[0].level;
        }else{
            user.xp=0;
            user.level=1;
        }
        res.status(200).json(user);
    }catch(err){
        console.error("Error fetching xp",err);
        res.status(500).json({error:"INTERNAL SERVER ERROR"});
    }
};

//CRUD 
export const createUser= async(req,res)=>{
    try{
        const {username,email,password}= req.body;

        const newUser = await pool.query(
            'INSERT INTO users (username,email,password) VALUES ($1,$2,$3) RETURNING *'
           ,[username,email,password]
        );
        res.status(201).json(newUser.rows[0]);//send back new user info(RETURNING *)
    }catch(error){
        console.log(error);
        res.status(500).json({error:'Internal server error'});
    }
};

// export const updateUser = async(req, res) => {
//     try{
//         const {id}=req.params;
//         const {username,email,password}=req.body;

//         const updatedUser= await pool.query(
//             'UPDATE users SET username=$1, email=$2, password=$3 WHERE id=$4 RETURNING *',
//             [username,email,password,id]
//         );

//         if(updatedUser.rows.length===0){ //no user updated
//             return res.status(404).json({error:'User not found'});
//         }
//         res.json(updatedUser.rows[0]);//send back updated user detail
//     }catch(error){
//         console.log(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };


export const updateUser = async(req, res) => {
    try{
        const {id}=req.params;
        const {username,email}=req.body;

        const updatedUser= await pool.query(
            'UPDATE users SET username=$1, email=$2 WHERE id=$3 RETURNING *',
            [username,email,id]
        );

        if(updatedUser.rows.length===0){ //no user updated
            return res.status(404).json({error:'User not found'});
        }
        res.json(updatedUser.rows[0]);//send back updated user detail
    }catch(error){
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteUser= async (req,res)=>{
    try{
        const { id } = req.params;

        const deletedUser=await pool.query(
            'DELETE FROM users WHERE id = $1 RETURNING *',
            [id]
        );

        if(deletedUser.rows.length===0){
            res.status(404).json({error:'User not found'});
        }
        //res.json(deleteUser.rows[0]);
        res.json({message:'User deleted successfully'});
    }catch(error){
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}