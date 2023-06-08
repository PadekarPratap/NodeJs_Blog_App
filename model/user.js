import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: [true, 'user must be provided'],
        unique: true
    },
    password:{
        type: String,
        required: [true, "password must be provided"],
        select: false
    }
}, {timestamps:true})


export const User = mongoose.model('User', userSchema)