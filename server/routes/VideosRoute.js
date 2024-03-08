import express from "express";
const router = express.Router();
import test from "../controllers/videoController.js";
router.get("/test", test);
export default router;
