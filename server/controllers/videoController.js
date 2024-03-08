import { createError } from "../Error/createError";
import videoModel from "../models/Video.js";

export const addVideo = async (req, res, next) => {
  try {
    const newVideo = new videoModel({ userId: req.user.id, ...req.body });
    try {
      const savedVideo = await newVideo.save();
      return res
        .status(201)
        .json({ message: "video saved", video: savedVideo });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = await videoModel.findById(req.params.id);
    if (!video) {
      return next(createError(401, "video not found"));
    }
    const updateVideo = videoModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.status();
  } catch (error) {}
};

export const deleteVideo = async (req, res, next) => {};

export const getVideo = async (req, res, next) => {};

export default {
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
};
