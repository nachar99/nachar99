const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const JWT_SECRET = process.env.JWT_SECRET || "dev_jwt_secret";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password)
      return res
        .status(400)
        .json({ message: "name, email, password required" });
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email in use" });

    const user = new User({ name, email });
    await user.setPassword(password);
    await user.save();
    res.status(201).json({ message: "User created" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const ok = await user.validatePassword(password);
    if (!ok)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { sub: user._id.toString(), email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({
      token,
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (e) {
    res.status(500).json({ message: "Login error" });
  }
};

module.exports = { register, login };
