import express from "express";
import cors from "cors";
import userRoutes from './routes/user.js'
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import postRoutes from './routes/post.js'

export const app = express();

// middlewares
app.use(cors({
    origin: [process.env.HOST_URL],
    methods: ['PUT', 'POST', 'DELETE', 'GET'],
    credentials: true
}))
app.use(express.json());
app.use(cookieParser())



// user routes
app.use('/api/v1/users', userRoutes)
// post routes
app.use('/api/v1/posts', postRoutes)


// error middleware
app.use(errorMiddleware)