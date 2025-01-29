import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilepic: {
        type: String,
        default: "https://cdn.vectorstock.com/i/1000v/23/81/default-avatar-profile-icon-vector-18942381.avif",

    },
    role: {
        type: String,
        enum: ["user","Admin","superAdmin"],
        required: true,
        default: "user",
    },
    isVerified: {
        type: Boolean,
        default: false
    },

    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
},{timestamps: true});

const User = mongoose.model("User", userschema);
export default User;
