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
  if (isNaN(userId)) return res.status(400).json({ error: "Invalid user ID" });

  try {
    const userResult = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
    if (userResult.rows.length === 0) return res.status(404).json({ message: "User not found" });

    const user = userResult.rows[0];
    const xpResult = await pool.query("SELECT xp, level FROM user_xp WHERE user_id = $1", [userId]);

    user.xp = xpResult.rows[0]?.xp || 0;
    user.level = xpResult.rows[0]?.level || 1;

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

    const emailCheck = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (emailCheck.rows.length > 0) return res.status(409).json({ error: "Email already registered" });

    const usernameCheck = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    if (usernameCheck.rows.length > 0) return res.status(409).json({ error: "Username already taken" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      `INSERT INTO users (username, email, password) VALUES ($1, $2, $3)
       RETURNING id, username, email, role, created_at`,
      [username, email, hashedPassword]
    );

    const user = newUser.rows[0];
    await pool.query("INSERT INTO user_xp (user_id, xp, level) VALUES ($1, $2, $3)", [user.id, 0, 1]);

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    if (error.code === "23505") {
      return res.status(409).json({ error: "Username or email already exists" });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

// ===================== LOGIN USER =====================
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userResult.rows.length === 0) return res.status(401).json({ error: "Invalid credentials" });

    const user = userResult.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    delete user.password;

    const accessToken = jwt.sign(
      { id: user.id, username: user.username, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 15 * 60 * 1000, // 15 min
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ===================== REFRESH TOKEN =====================
export const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) return res.status(401).json({ error: "Refresh token missing" });

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 15 * 60 * 1000,
    });

    return res.status(200).json({ message: "Access token refreshed" });
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired refresh token" });
  }
};

// ===================== GET CURRENT USER (/me) =====================
export const getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ error: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = Number(decoded.id);

    const result = await pool.query("SELECT id, username, email, role, created_at FROM users WHERE id = $1", [userId]);
    const user = result.rows[0];
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ user });
  } catch (err) {
    console.error("Get current user error:", err);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

// ===================== LOGOUT USER =====================
export const logoutUser = (req, res) => {
res.clearCookie("accessToken", {
  httpOnly: true,
  sameSite: "lax",
  secure: false, // 🔁 set to true in production
});

res.clearCookie("refreshToken", {
  httpOnly: true,
  sameSite: "lax",
  secure: false,
});

res.status(200).json({ message: "Logged out successfully" });

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
    const deletedUser = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [userId]
    );

    if (deletedUser.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
