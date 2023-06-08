import express from "express";
import {
  createNewUser,
  getUserProfile,
  loginUser,
  logoutUser,
} from "../controllers/user.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

// register a new user
router.post("/new", createNewUser);

// login a new user
router.post("/login", loginUser);

// logout an existing user
router.get("/logout", auth, logoutUser);

// get the profile of an logged/registered in user
router.get("/profile", auth, getUserProfile);

export default router;
