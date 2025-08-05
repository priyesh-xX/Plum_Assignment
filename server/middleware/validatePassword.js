// Strong password rules:
// - Minimum 8 characters
// - At least 1 uppercase
// - At least 1 lowercase
// - At least 1 number
// - At least 1 special character

export const validatePassword = (req,res,next)=>{
    const {password}=req.body;

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if(!password || !strongPasswordRegex.test(password)){
        return res.status(400).json({
            error:
            "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
        });
    }
    next();
};

// export default validatePassword;