import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

//auth user & get token
//route  POST/api/users/login
//access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
      expiresIn: "30d"
    }) // create token

    //Set JWT as HTTP-Only cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",// true in production
      sameSite: "strict",
      maxAge: 30*24*60*60*1000 // 30days
    })
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//REGISTER user
//route  POST/api/users
//access Public
const registerUser = asyncHandler(async (req, res) => {
  res.send("register user");
});

//Logout user /clear cookie
//route  GET/api/users/logout
//access Private
const logoutUser = asyncHandler(async (req, res) => {
  res.send("logout user");
});

//get user profile
//route  GET/api/users/profile
//access private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send(" user profile");
});

//update user profile
//route  PUT/api/users/profile
//access PRIVATE
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user profile");
});

// get users
//route  GET/api/users
//access PRIVATE/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});

// get users by id
//route  GET/api/users/:id
//access PRIVATE/Admin
const getUserById = asyncHandler(async (req, res) => {
  res.send("getuserbyid");
});

//delete user
//route  DELETE/api/users/:id
//access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

// update user
//route  PUT/api/users/:id
//access PRIVATE/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  getUserById,
  getUsers,
  updateUser,
  updateUserProfile,
  deleteUser,
};
