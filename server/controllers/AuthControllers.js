import jwt from 'jsonwebtoken'
const bcrypt = await import('bcryptjs');
import { createUser, prisma } from './UserControllers.js';

const signToken = userid => {
  return jwt.sign({ userid }, process.env.SECRET, {
    expiresIn: '90d'
  });
}

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Not logged in!" });
    }
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.userid } });
    if (!user) {
      return res.status(401).json({ message: "User no longer exists." });
    }
    req.userid = decoded.userid
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

const signup = async (req, res) => {
  try {
    const { email, name, password, passwordConfirm } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    if (existingUser) {
      return res.status(400).json({
        status: "failed",
        message: "User already exists, please sign in!"
      });
    }
    const newUser = await createUser({ email, name, password, passwordConfirm });
    const token = signToken(newUser.id);

    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production"
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 90 * 24 * 60 * 60 * 1000,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production"
    });

    return res.status(200).json({
      status: "success",
      data: newUser
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      message: err.message
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email }
    });
    if (!user) {
      return res.status(401).json({
        status: "failed",
        message: "Invalid email or password!"
      });
    }
    const comparePassword = async function (password) {
      return await bcrypt.compare(password, user.password);
    }
    if (!user || !(await comparePassword(password))) {
      return res.status(401).json({
        status: "failed",
        message: "Invalid email or password!"
      });
    }
    const token = signToken(user.id);

    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production"
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 90 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax"
    });

    return res.status(200).json({
      status: "success",
      data: user
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      message: err.message
    });
  }
}

const logout = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production"
  });
  return res.status(200).json({
    status: "success",
    message: "Logged out successfully"
  });
};

export { protect, signup, login, logout }
