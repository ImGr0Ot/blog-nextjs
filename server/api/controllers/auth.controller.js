import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { TOKEN_SECRET } from "../config.js";

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userFound = await User.findOne({ email });

    if (userFound)
      return res.status(400).json({
        message: ["The email is already in use"],
      });

    // hashing the password
    const passwordHash = await bcrypt.hash(password, 10);

    // creating the user
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    // saving the user in the database

    const userSaved = await newUser.save();
    console.log(userSaved);

    res.json({
      username: userSaved.username,
      email: userSaved.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });

    if (!userFound)
      return res.status(400).json({
        message: ["The email does not exist"],
      });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({
        message: ["The password is incorrect"],
      });
    }

    await res.json({
      username: userFound.username,
      email: userFound.email,
      imgUrl: userFound.imgUrl,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};

export const logout = async (req, res) => {
  req.token = "";
  res.cookie("token", "");
  res.json({
    message: "Logout success",
  });
};

export const update = async (req, res) => {
  try {
    const { imgUrl } = req.body;
    const email = req.params.email;
    const userFound = await User.findOne({ email });

    if (!userFound)
      return res.status(400).json({
        message: ["User not found"],
      });

    const userSaved = await User.findByIdAndUpdate(
      userFound._id,
      { imgUrl: imgUrl },
      {
        new: true,
      }
    );

    res.status(200).json({
      username: userSaved.username,
      email: userSaved.email,
      imgUrl: userSaved.imgUrl,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
