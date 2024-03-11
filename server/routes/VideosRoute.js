import express from "express";
const router = express.Router();
import {
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  incrementViews,
  trend,
  random,
  sub,
  getBySearch,
  getByTags,
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

//increment views of the video on refreshing th epage
router.get("/views/:id", incrementViews);

//get trending video
router.get("/trend/", trend);

//get random videos for homepage
router.get("/random", random);

//subscribed videos
router.get("/sub", verifyToken, sub);

//search videos by tags
router.get("/tags", getByTags);
//search videos by tags
router.get("/search", getBySearch);
export default router;
