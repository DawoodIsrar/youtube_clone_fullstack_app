import express from "express";
const router = express.Router();
import test, {
  deleteUser,
  dislike,
  getUser,
  like,
  subscribe,
  unsubscribe,
  updateUser,
} from "../controllers/userController.js";
//update user
router.put("/:id", updateUser);
//delete User
router.delete("/:id", deleteUser);
//get a User
router.get("/find/:id", getUser);
//subscribe a user
router.put("/sub/:id", subscribe);
//unsubscribe a user
router.put("/sub/:id", unsubscribe);

//dislike a video
router.put("/dislikes/:id", dislike);
//like a video
router.put("/likes/:id", like);

export default router;
