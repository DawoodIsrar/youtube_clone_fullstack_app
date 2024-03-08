import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/UserRoute.js";
import videoRouter from "./routes/VideosRoute.js";
import authRouter from "./routes/auth.js";
import commentRouter from "./routes/CommentRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const connect = () => {
  mongoose
    .connect("mongodb+srv://ittepaq:123420@testing.uj2ftni.mongodb.net/youtube")
    .then(() => {
      console.log("connected to db");
    })
    .catch((err) => {
      console.log(err);
    });
};
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    sucess: false,
    status: status,
    message: message,
  });
});
app.use(cookieParser());
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/video", videoRouter);
app.use("/api/comment", commentRouter);
app.use("/api/auth", authRouter);

app.listen(8000, () => {
  connect();

  console.log("server is running on 8000");
});
