const jwt = require("jsonwebtoken");

const User = require("../models/user");

const create = async (req, res) => {
  const { email, password, name } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(403).json({ message: "User already exists" });
  }
  const user = await User.create({ name, email, password });
  res.status(201).json({ user: { id: user._id, name, email } });
};

const signIn = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({
    email,
  });

  if (!user) return res.status(403).json({ error: "User not found" });
  const matched = await user.comparePassword(password);
  if (!matched) {
    return res.status(403).json({ error: "Email/Password mismatch!" });
  }
  const JWT_SECRET = process.env.JWT_SECRET;
  const token = jwt.sign({ userId: user._id }, JWT_SECRET);
  await user.save();

  res.json({
    profile: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  });
};

module.exports = {
  create,
  signIn,
};
