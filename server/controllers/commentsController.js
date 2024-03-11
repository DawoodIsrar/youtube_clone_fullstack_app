import { createError } from "../Error/createError.js";
import commentModal from "../models/Comments.js";
import VideoModel from "../models/Video.js";
export const addComment = async (req, res, next) => {
  try {
    console.log("video id", req.params.id);

    const videoId = req.params.id;
    const userId = req.user.id;
    console.log("user id", userId);

    if (videoId !== null) {
      if (userId !== null) {
        const addComment = new commentModal({
          videoId,
          userId,
          desc: req.body.desc,
        });
        await addComment.save();
        return res.status(201).json({
          success: true,
          message: "comment added successfully",
          Comment: addComment,
        });
      } else {
        return res.status(403).json("the user is not authenticated");
      }
    } else {
      return res.status(403).json("the video url is invalid");
    }
  } catch (error) {
    next(createError(500, "server error"));
  }
};
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await commentModal.findById(req.params.id);
    const video = comment.videoId;
    console.log("video id", video);
    const videoDel = await VideoModel.findById(video);

    console.log("hey from comment", comment);
    console.log("hey from video", videoDel);
    console.log("user id from auth", req.user.id);
    if (req.user.id === comment.userId) {
      await commentModal.findByIdAndDelete(req.params.id);
      return res.status(201).json({
        success: true,
        message: "comment deleted successfully",
        Comment: addComment,
      });
    } else {
      next(createError(403, "you can delete your own comments"));
    }
  } catch (error) {
    next(createError(500, "something wents wrong"));
  }
};
// export const updateComment = async () => {};
export const getAllComments = async (req, res, next) => {
  try {
    const comment = await commentModal.find({ videoId: req.params.videoId });
    return res.status(200).json({ comments: comment });
  } catch (error) {
    next(createError(500, "sorry something went wrong"));
  }
};

export default {
  getAllComments,
  deleteComment,
  addComment,
  // updateComment,
};
