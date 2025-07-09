import jwt from "jsonwebtoken";

export const verifyAdmin=(req,res,next)=>{
    try{
        const token=req.cookies.token;
        if(!token) return res.status(401).json({error:"Unauthorized"});

        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(decoded.role != "admin"){
            return res.status(403).json({ error: "Forbidden – Admins only" });
        }
        req.user = decoded; // attach decoded user info to request
        next();
    }catch(err){
        console.error("Auth error:", err);
        res.status(401).json({ error: "Invalid token" });
    }
};