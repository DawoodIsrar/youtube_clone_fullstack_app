import express from "express";
const router = express.Router();
import {
  deleteUser,
  dislike,
  getUser,
  getUserById,
  like,
  subscribe,
  unsubscribe,
  updateUser,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
//update user
router.put("/update/:id", verifyToken, updateUser);
//delete User
router.delete("/delete/:id", verifyToken, deleteUser);
//get a User
router.get("/find", getUser);
//get user by id
router.get("/findById/:id", getUserById);

//subscribe a user
router.put("/sub/:id", verifyToken, subscribe);
//unsubscribe a user
router.put("/sub/:id", verifyToken, unsubscribe);

//dislike a video
router.put("/dislikes/:id", verifyToken, dislike);
//like a video
router.put("/likes/:id", verifyToken, like);

export default router;
