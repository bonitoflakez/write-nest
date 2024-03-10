import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const Register = async (req: Request, res: Response) => {
  const { user_name, user_email, user_passwd } = req.body;
  
  try {
    // generate user id
    const user_id = uuidv4();

    if (!user_id) {
      return res.status(403).json({
        status: "failed",
        message: "Error while generating user ID"
      })
    }

    // generate salt for password hashing
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
  
    // hash password using the generated salt
    const hashedPasswd = bcrypt.hashSync(user_passwd, salt);

    if (!hashedPasswd) {
      return res.status(403).json({
        status: "failed",
        message: "Error while generating password hash"
      })
    }

    return res.status(201).json({
      status: "success",
      user: { 
        userId: user_id,
        userName: user_name, 
        userEmail: user_email, 
        userPasswd: hashedPasswd 
      }
    })
  } catch (err: any) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error"
    })
  }
}

export default Register
