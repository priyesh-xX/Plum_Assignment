import { pool } from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ===================== GET ALL USERS =====================
export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ===================== GET USER BY ID (with XP) =====================
export const getUserById = async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const userResult = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = userResult.rows[0];

    const xpResult = await pool.query(
      "SELECT xp, level FROM user_xp WHERE user_id = $1",
      [userId]
    );

    if (xpResult.rows.length > 0) {
      user.xp = xpResult.rows[0].xp;
      user.level = xpResult.rows[0].level;
    } else {
      user.xp = 0;
      user.level = 1;
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user with XP:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ===================== CREATE USER (SIGNUP) =====================
export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existing = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: "User already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      `INSERT INTO users (username, email, password) 
       VALUES ($1, $2, $3) 
       RETURNING id, username, email, role, created_at`,
      [username, email, hashedPassword]
    );

    const user = newUser.rows[0];

    await pool.query(
      "INSERT INTO user_xp (user_id, xp, level) VALUES ($1, $2, $3)",
      [user.id, 0, 1]
    );

    const token = jwt.sign(
      {
         id: Number(user.id),
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
      token, // useful for Postman/debugging
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ===================== LOGIN USER =====================
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = userResult.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
         id: Number(user.id),
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    delete user.password;

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ===================== UPDATE USER =====================
export const updateUser = async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const { username, email, password } = req.body;

  try {
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    const updatedUser = await pool.query(
      "UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING id, username, email, role, created_at",
      [username, email, hashedPassword, userId]
    );

    if (updatedUser.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser.rows[0]);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ===================== DELETE USER =====================
export const deleteUser = async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  try {
    const deletedUser = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [userId]);

    if (deletedUser.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ===================== GET CURRENT USER (/me) =====================
export const getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded);
     const userId = Number(decoded.id);
    if (!userId || isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID in token" });
    }

    const result = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    delete user.password;
    res.status(200).json({ user });
  } catch (err) {
    console.error("Get current user error:", err);
    console.log("Decoded token:", decoded);

    res.status(401).json({ error: "Invalid or expired token" });
  }
};
