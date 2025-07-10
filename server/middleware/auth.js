import jwt from "jsonwebtoken";

export const verifyAdmin = (req, res, next) => {
  try {
    const token = req.cookies.accessToken; // ✅ match your cookie name

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user is admin
    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Forbidden – Admins only" });
    }

    // Attach user to request
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Admin auth error:", err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
