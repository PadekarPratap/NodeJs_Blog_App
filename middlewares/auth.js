import { User } from "../model/user.js";
import ErrorHandler from "../utils/errorHandler.js";
import Jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  const { blogToken } = req.cookies;

  if (!blogToken) return next(new ErrorHandler("Please login or sign up", 400));

  const token = Jwt.verify(blogToken, process.env.SECRET_KEY);
  const { _id } = token;

  req.user = await User.findById(_id);
  next();
};
