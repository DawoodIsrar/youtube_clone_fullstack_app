import { createError } from "../Error/createError.js";
import User from "../models/User.js";
import Video from "../models/Video.js";
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
    console.log("hey from update video");
    const video = await videoModel.findById(req.params.id);
    console.log("video found:", video);
    // console.log(createError(401, "video not found"));
    console.log("======> user from authentication", req.user.id);
    if (!video) {
      console.log("is error here");
      return next(createError(403, "you can only update your own videos"));
    }
    if (req.user.id === video.userId) {
      console.log("here in the condition");
      console.log("req body", req.body);
      const updateVideo = await videoModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return res.status(200).json(updateVideo);
    } else {
      next(createError(403, "you can only update your own video"));
    }
  } catch (error) {
    next(createError(500, "something went wrong"));
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await videoModel.findById(req.params.id);
    if (!video) {
      return next(createError(401, "video not found"));
    }
    if (req.user.id === video.userId) {
      const deleteVideo = videoModel.findByIdAndDelete(req.params.id);
      return res.status(200).json("video deleted sucessfully");
    } else {
      next(createError(403, "you can only update your own video"));
    }
  } catch (error) {
    next(createError(500, "something went wrong"));
  }
};

export const getVideo = async (req, res, next) => {
  try {
    const video = await videoModel.findById(req.params.id);

    return res.status(200).json("video deleted sucessfully :", video);
  } catch (error) {
    next(createError(500, "something went wrong"));
  }
};

export const incrementViews = async (req, res, next) => {
  try {
    await videoModel.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });

    return res.status(200).json("video views increased :");
  } catch (error) {
    next(createError(500, "something went wrong"));
  }
};

export const trend = async (req, res, next) => {
  try {
    const vedeoTrend = await videoModel.find().sort({ views: -1 });
    return res.status(200).json("random videos", vedeoTrend);
  } catch (error) {
    next(createError(500, "something went wrong"));
  }
};
export const random = async (req, res, next) => {
  try {
    console.log("get random videos for homepage");
    const randomVideo = await videoModel.aggregate([{ $sample: { size: 1 } }]);
    console.log("video found for random", randomVideo);
    return res.status(200).json(randomVideo);
  } catch (error) {
    next(createError(500, "something went wrong"));
  }
};
export const sub = async (req, res, next) => {
  try {
    console.log("id in sub users", req.user.id);
    const user = await User.findById(req.user.id);
    const subscribedChanel = user.subcriberedUsers;
    const list = await Promise.all(
      subscribedChanel.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );
    return res
      .status(200)
      .json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    next(createError(500, "something went wrong"));
  }
};

export const getByTags = async (req, res, next) => {
  try {
    const tags = req.query.tags.split(",");
    const videos = await videoModel.find({ tags: { $in: tags } }).limit(20);
    return res.status(200).json(videos);
  } catch (error) {
    next(createError(500, "something went wrong"));
  }
};

export const getBySearch = async (req, res, next) => {
  const query = req.query.q;
  console.log("query", query);
  try {
    const videos = await videoModel
      //reqex for title checking and i for hving check on capital letter as well as lower case
      .find({ title: { $regex: query, $options: "i" } })
      .limit(2);
    return res
      .status(200)
      .json(videos.sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    next(createError(500, "something went wrong"));
  }
};

export default {
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  incrementViews,
  trend,
  random,
  sub,
  getByTags,
  getBySearch,
};
