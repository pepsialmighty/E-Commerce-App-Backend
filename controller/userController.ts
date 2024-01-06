import { Request, Response } from "express";
import User from "../models/userModel";

const createUser = async (req: Request, res: Response) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    // Create a new user
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    // User Already Exists
    res.json({
      msg: "User Already Exists",
      success: false,
    });
  }
};

export default createUser;
