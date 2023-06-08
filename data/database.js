import mongoose from "mongoose";

export const connectDb = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log(`Database has been connected successfully!`))
    .catch((err) => console.log(err.message));
};
