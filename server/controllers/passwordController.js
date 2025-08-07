import { pool } from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import crypto from "crypto";
import nodemailer from "nodemailer";


// create and send reset token
export const forgotPassword=async(req,res)=>{
  const {email}=req.body;
  try{
    const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "No user with that email" });
    }
    const user=userResult.rows[0];

    const token=crypto.randomBytes(32).toString("hex");//generates a 256-bit (32-byte) secure toke converted to hex
    const expiresAt = new Date(Date.now() + 1000 * 60 * 30); //in 30 mins from now

     // Store token
    await pool.query(
      "INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)",
      [user.id, token, expiresAt]
    );

    //send email
    const transporter=nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const resetUrl = `http://localhost:5173/reset-password/${token}`; // frontend link

    // console.log(" Reset link (dev only):", resetUrl);

    await transporter.sendMail({
      from: `"Gnosis Quiz" <${process.env.GMAIL_USER}>`,
      to: user.email,
      subject: "Reset your password",
      html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password. This link will expire in 30 minutes.</p>`,
    });

    console.log(" Reset link:", resetUrl);

    return res.status(200).json({message:"Reset mail sent"});
  }catch(err){
    console.error(err);
    return res.status(500).json({error:"Server error"});
  }
};

//RESET
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {

    // const hashedToken= crypto.createHash("sha256").update(token).digest("hex");//hashed using SHA-256 (token not stored in plaintext)

    const result = await pool.query(  //user whos token matches and hasnt expired 
      "SELECT * FROM password_reset_tokens WHERE token = $1 AND expires_at > NOW()", 
      [token]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    const userId = result.rows[0].user_id;

    const hashedPassword = await bcrypt.hash(password, 10);//hash the new created password securely 

    await pool.query("UPDATE users SET password = $1 WHERE id = $2", [hashedPassword, userId]);//update new password

    await pool.query("DELETE FROM password_reset_tokens WHERE token = $1", [token]);//clear out reset token

    return res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};
