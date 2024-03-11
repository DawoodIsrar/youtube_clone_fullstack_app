import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  addComment,
  deleteComment,
  //   updateComment,
  getAllComments,
} from "../controllers/commentsController.js";
const router = express.Router();

// add comment
router.post("/:id", verifyToken, addComment);

//delete comment
router.delete("/:id", verifyToken, deleteComment);

//update commment
// router.post("/:id", updateComment);

//getComment
router.get("/:videoId", getAllComments);

export default router;
