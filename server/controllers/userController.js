import mongoose from "mongoose";
import User from "../models/User.js";
import { createError } from "../Error/createError.js";

export const updateUser = async (req, res, next) => {
  console.log("req params", req.params.id);
  console.log("req.user id ", req.user.id);
  console.log("id checking", req.params.id === req.user.id);
  if (req.params.id === req.user.id) {
    try {
      console.log("user detail", req.user);

      const isUserExist = await User.findByIdAndUpdate(
        req.user.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      console.log("user existed or not", isUserExist);

      return res.status(200).json({
        sucess: true,
        message: "user is successfully updated!",
        UserNewDetail: isUserExist,
      });
    } catch (error) {
      next(createError(401, "there is problem in req"));
    }
  } else {
    next(createError(500, "something went wrong"));
  }
};
export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      console.log("user detail", req.user);

      const isUserExist = await User.findByIdAndDelete(req.user.id);
      console.log("user existed or not", isUserExist);

      return res.status(200).json({
        sucess: true,
        message: "user is successfully deleted!",
      });
    } catch (error) {
      next(createError(401, "User not found"));
    }
  } else {
    next(createError(500, "something went wrong"));
  }
};
export const getUser = async (reqs, res, next) => {
  try {
    const users = await User.find();
    console.log("allUsers", users);
    return res.status(200).json({
      sucess: true,
      message: "all users",
      users: users,
    });
  } catch (error) {
    next(createError(500, "internal server error"));
  }
};
export const getUserById = async (req, res, next) => {
  try {
    const users = await User.findById({ _id: req.params.id });
    console.log("user", users);
    return res.status(200).json({
      sucess: true,
      message: "user found",
      users: users,
    });
  } catch (error) {
    next(createError(500, "internal server error"));
  }
};
export const subscribe = async (req, res, next) => {};
export const unsubscribe = async (req, res, next) => {};
export const like = async (req, res, next) => {};
export const dislike = async (req, res, next) => {};

export default {
  updateUser,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
};
