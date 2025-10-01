import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js"; 

// Register controller
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Check required fields
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create and save new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // 5. Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: "7h" }
    );

    // 6. Prepare safe response object (without password)
    const userResponse = newUser.toObject();
    delete userResponse.password;

    // 7. Set cookie (optional)
    res.cookie("token", token, {
      httpOnly: true,  // safer
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // 8. Send response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: userResponse,
      token,
    });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check required fields
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    // 2. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // 3. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // 4. Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 5. Prepare safe user response
    const userResponse = user.toObject();
    delete userResponse.password;

    // 6. Set cookie (optional)
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
    });

    res.cookie("theme", "dark", {
        httpOnly: false,
        secure: false,
    });


    // 7. Send response
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: userResponse,
      token,
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

