import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    // Remove "Bearer " prefix
    const token = authHeader.replace("Bearer ", "");

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    req.user = { userId: decoded.id };

    next();
  } catch (error) {
    res.status(401).json({ error: "Please authenticate" });
  }
};

export default auth;
