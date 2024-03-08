import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../Error/createError.js";
export const signup = async (req, res, next) => {
  try {
    try {
      let { name, email, password } = req.body;
      const isUserExist = await User.findOne({ email });
      if (isUserExist) {
        return next(
          createError(
            404,
            "Email is duplicating the user with same email already exist"
          )
        );
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash });
        await newUser.save();
        return res.status(201).json({
          status: 201,
          message: "user ragister successfully!",
          user: newUser,
        });
      }
    } catch (error) {
      next(createError(404, "User cannot be register"));
    }
  } catch (error) {
    next(createError(500, "something went wrong"));
  }
};

export const signin = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    const isuserExist = await User.findOne({ email });

    if (!isuserExist) {
      next(createError(404, "User not found"));
    }
    const passwordIsTrue = bcrypt.compareSync(password, isuserExist.password);
    if (passwordIsTrue) {
      const token = jwt.sign({ id: isuserExist._id }, "youtube", {
        expiresIn: "1d",
      });
      const { password, ...other } = isuserExist._doc;
      return res
        .cookie("acces_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ ...other });
    } else {
      next(createError(404, "password you enter is wrong"));
    }
  } catch (error) {
    next(createError(500, "Something went wrong in the server "));
  }
};
