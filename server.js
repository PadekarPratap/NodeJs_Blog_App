import { app } from "./app.js";
import { config } from "dotenv";
import { connectDb } from "./data/database.js";
import cloudinary from "cloudinary";

config({
  path: "./data/config.env",
});

connectDb();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});


app.listen(process.env.PORT, () =>
  console.log(`Server has started working on port ${process.env.PORT}`)
);
