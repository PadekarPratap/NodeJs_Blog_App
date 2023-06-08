import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Post } from "../model/post.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";
import ErrorHandler from "../utils/errorHandler.js";

// to create a new post
export const createNewPost = catchAsyncError(async (req, res, next) => {
  const file = req.file;
  const { title, summary, content } = req.body;
  const { _id, user } = req.user;

  const fileUri = getDataUri(file);
  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
  const post = await Post.create({
    title,
    summary,
    content,
    cover: {
      public_id: myCloud.public_id,
      url: myCloud.url,
    },
    userId: _id,
    createdBy: user,
  });

  res.status(201).json({
    success: true,
    message: "The post has been created successfully",
    post,
  });
});

// to get all posts

export const getAllPosts = catchAsyncError(async (req, res, next) => {
  const posts = await Post.find().sort({ updatedAt: -1 });

  res.status(200).json({
    success: true,
    message: "Posts fetched successfully",
    posts,
  });
});

// get a single post
export const getSinglePost = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) return next(new ErrorHandler("No post found", 404));

  res.status(200).json({
    success: true,
    message: "Post has been fetched successfully.",
    post,
  });
});

// update/edit a single post
export const editPost = catchAsyncError(async (req, res, next) => {
  const { _id } = req.user;
  const file = req.file;
  const { id } = req.params;
  let post = await Post.findById(id);

  let myCloud
  if (file) {
    const fileUri = getDataUri(file);
    myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
  }

  const isAuthor = post.userId.toString() === _id.toString(); // Database _id cannot be compared directly. must to converted to string before comparing
 
  if (!isAuthor)
    return next(
      new ErrorHandler("You do not have the permission to edit this post", 400)
    );

  post = await Post.findByIdAndUpdate(
    id,
    {
      ...req.body,
      cover: {
        public_id: myCloud?.public_id || post.cover.public_id,
        url: myCloud?.url || post.cover.url,
      },
    },
    { new: true }
  );

  res.status(201).json({
    success: true,
    message: "The post has been updated successfully",
    post,
  });
});

// to delete a single post
export const deletePost = catchAsyncError(async(req, res, next) =>{
    const {_id} = req.user
    const {id} = req.params

    let post =  await Post.findById(id)
    if(!post) return next(new ErrorHandler('No Post found', 404))

    const isAuthor = post.userId.toString() === _id.toString()
    if(!isAuthor) return next(new ErrorHandler("You do not have the permission to delete this post", 400))

    post = await Post.findByIdAndDelete(id)

    res.status(200).json({
        success: true, 
        message: 'The post has been successfully deleted!',
        post
    })

})
