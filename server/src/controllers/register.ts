import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

import User from "../models/User";

const Register = async (req: Request, res: Response) => {
  try {
    const { user_name, user_email, user_passwd } = req.body;

    // Input validation
    if (!user_name || !user_email || !user_passwd) {
      return res.status(400).json({
        status: "failed",
        message: "All fields are required",
      });
    }

    // Check if the email or username already exists
    const userAlreadyExists = await User.findOne({
      $or: [{ user_name }, { user_email }],
    });

    if (userAlreadyExists) {
      return res.status(400).json({
        status: "failed",
        message: "Username or Email already exists",
      });
    }

    // Generate user id
    const user_id = uuidv4();

    if (!user_id) {
      return res.status(403).json({
        status: "failed",
        message: "Error while generating user ID",
      });
    }

    // Generate salt for password hashing
    const salt = await bcrypt.genSalt(10);

    // Hash password using the generated salt
    const hashedPasswd = await bcrypt.hash(user_passwd, salt);

    if (!hashedPasswd) {
      return res.status(403).json({
        status: "failed",
        message: "Error while generating password hash",
      });
    }

    // Create new user
    const newUser = new User({
      user_id,
      user_name,
      user_email,
      user_passwd: hashedPasswd,
    });

    // Save new user
    const userSaved = await newUser.save();

    if (!userSaved) {
      return res.status(500).json({
        status: "error",
        message: "Failed to save user to the database",
      });
    }

    return res.status(201).json({
      status: "success",
      message: `Successfully registered ${user_name}`,
      userData: {
        userId: user_id,
        userName: user_name,
      },
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export default Register;
