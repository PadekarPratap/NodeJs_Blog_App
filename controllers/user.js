import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../model/user.js";
import ErrorHandler from "../utils/errorHandler.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

// To Create a new user
export const createNewUser = catchAsyncError(async (req, res, next) => {
  const { user, password } = req.body;
  const alreadyUser = await User.findOne({ user });
  if (alreadyUser)
    return next(
      new ErrorHandler(
        `User by the name "${user}" already exists. Try using a different username.`,
        400
      )
    );

  // encrypting the password / hashing the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const username = await User.create({ user, password: hashedPassword });

  res
    .status(201)
    .json({
      success: true,
      message: "User has been created successfully!",
      username,
    });
});

// login for an existing user
export const loginUser = catchAsyncError(async (req, res, next) => {
  const { user, password } = req.body;

  const userExist = await User.findOne({ user }).select("+password");
  if (!userExist)
    return next(new ErrorHandler("Invalid user or password.", 404));

  const isMatched = await bcrypt.compare(password, userExist.password);
  if (!isMatched)
    return next(new ErrorHandler("Invalid user or password", 404));

  const token = Jwt.sign({ _id: userExist._id }, process.env.SECRET_KEY);

  res
    .status(200)
    .cookie("blogToken", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      SameSite: "None",
      Secure: true,
    })
    .json({
      success: true,
      message: `Welcome back, ${userExist.user}`,
      user: userExist,
    });
});

// logout an existing user
export const logoutUser = catchAsyncError(async (req, res, next) => {
  const { user } = req.user;

  res
    .status(200)
    .cookie("blogToken", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: `${user} has been successfully logged out!`,
    });
});


// get the profile of an existing user
export const getUserProfile = catchAsyncError(async(req,res,next) =>{

    const {user, _id} = req.user // hashed password will not be saved in req.user due to select: false in user model

    res.status(200).json({
      success: true,
      user: {
        user,
        _id
      }
    })

})