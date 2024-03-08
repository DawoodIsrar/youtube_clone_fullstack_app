import express from "express";
const router = express.Router();
import { signup, signin } from "../controllers/authController.js";

//create a user
router.post("/signup", signup);
//sign in
router.post("/signin", signin);

// google Auth
router.post("/googleauth", (req, res) => {});

export default router;
