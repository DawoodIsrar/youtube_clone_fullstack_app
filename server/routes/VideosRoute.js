import express from "express";
const router = express.Router();
import {
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
} from "../controllers/videoController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

//create a video
router.post("/", verifyToken, addVideo);
// router.post("/", verifyToken, addVideo);
//update the video
router.put("/:id", verifyToken, updateVideo);

//delete video
router.delete("/:id", verifyToken, deleteVideo);

// get video
router.get("/find/:id", getVideo);

export default router;
