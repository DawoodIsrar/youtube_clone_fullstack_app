import { createError } from "../Error/createError.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  console.log("======>>>>>> verify user middleware is called");
  const token = req.cookies.acces_token;
  console.log("======>>>>>> tokennnnn", token);
  // Check if the token exists
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  } else {
    jwt.verify(token, "youtube", (err, user) => {
      if (err) {
        return next(createError(403, "Token is not valid!"));
      }
      req.user = user;
      console.log("user detail in verification", req.user);
      next();
    });
  }
};
