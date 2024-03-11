import mongoose from "mongoose";
import User from "../models/User.js";
import { createError } from "../Error/createError.js";
import Video from "../models/Video.js";

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
export const subscribe = async (req, res, next) => {
  try {
    console.log(
      "req reach here id of user who subscribe :",
      req.user.id,
      "and subscribe the channel",
      req.params.id
    );
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subcriberedUsers: req.params.id },
    });

    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subcribers: 1 },
    });
    console.log(
      "req reach here id of user who subscribe :",
      req.user.id,
      "and subscribe the channel",
      req.params.id
    );
    return res.status(201).json({ message: "subscribed" });
  } catch (error) {
    next(createError(500, "something went wrong"));
  }
};
export const unsubscribe = async (req, res, next) => {
  try {
    console.log(
      "req reach here id of user who subscribe :",
      req.user.id,
      "and subscribe the channel",
      req.params.id
    );
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subcriberedUsers: req.params.id },
    });

    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subcribers: -1 },
    });
    console.log(
      "req reach here id of user who subscribe :",
      req.user.id,
      "and subscribe the channel",
      req.params.id
    );
    return res.status(201).json({ message: "unsubscribe" });
  } catch (error) {
    next(createError(500, "something went wrong"));
  }
};
export const like = async (req, res, next) => {
  try {
    const id = req.user.id;
    const videoId = req.params.id;
    console.log("user id", id);
    console.log("video id", videoId);

    try {
      // Use the { new: true } option to return the updated document
      const commentedVideo = await Video.findByIdAndUpdate(
        videoId,
        {
          $addToSet: { likes: id },
          $pull: { dislikes: id },
        },
        { new: true }
      );
      console.log(commentedVideo);
      if (!commentedVideo) {
        throw createError(403, "Video not found");
      }
      if (req.user.id === commentedVideo.userId) {
        return res.status(200).json(commentedVideo);
      } else {
        next(createError(403, "sorry video not found"));
      }
    } catch (error) {
      next(createError(403, "Video not found"));
    }
  } catch (error) {
    next(createError(500, "Internal server error"));
  }
};

export const dislike = async (req, res, next) => {
  try {
    const id = req.user.id;
    const videoId = req.params.id;

    try {
      // Use the { new: true } option to return the updated document
      const updatedVideo = await Video.findByIdAndUpdate(
        videoId,
        {
          $addToSet: { dislikes: id },
          $pull: { likes: id },
        },
        { new: true }
      );

      if (!updatedVideo) {
        throw createError(403, "Video not found");
      }

      return res.status(200).json("The video is disliked");
    } catch (error) {
      next(createError(403, "Video not found"));
    }
  } catch (error) {
    next(createError(500, "Internal server error"));
  }
};

export default {
  updateUser,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
};
