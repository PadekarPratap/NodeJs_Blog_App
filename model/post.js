import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Title is a required field"]
    },
    summary:{
        type: String,
        required: [true, "Summary of the post is required"]
    },
    cover:{
        public_id:{
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
    },
    content:{
        type: String,
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdBy:{
        type: String,
        required: true,
    }

}, {timestamps: true})


export const Post = mongoose.model("Post", postSchema)