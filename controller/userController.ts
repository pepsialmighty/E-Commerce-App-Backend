import { generateToken } from "./../config/jwtConnect";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    // Create a new user
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    // User Already Exists
    throw new Error("User Already Exists");
  }
});

export const loginUserController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findUser = await User.findOne({ email: email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

// Get All Users
export const getAllUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    console.log(getUsers);
    res.json(getUsers);
  } catch (error: any) {
    throw new Error(error);
  }
});

// Get a single user
export const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getUser = await User.findById(id);
    res.json(getUser);
  } catch (error: any) {
    throw new Error(error);
  }
});

// Update a user
export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      { new: true }
    );
    res.json(updateUser);
  } catch (error: any) {
    throw new Error(error);
  }
});

// Delete a single user
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getUser = await User.findByIdAndDelete(id);
    res.json(getUser);
  } catch (error: any) {
    throw new Error(error);
  }
});
