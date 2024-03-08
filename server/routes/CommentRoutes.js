import express from "express";
const router = express.Router();
import test from "../controllers/commentsController.js";
router.get("/test", test);
export default router;
