import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    StartTime: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    eventType: {
        type: String,
        required: true,
        enum: ["Private", "Public"],
    },
    eventCategory: {
        type: String,
        required: true,
        enum: ["Concert", "Wedding", "Party", "Conference", "Others"],
    },
    eventStatus: {
        type: String,
        required: true,
        enum: ["Active", "Pending", "Cancelled","Ended"],
        default: "Pending",
    },
    host:{
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {timestamps: true});

const Event = mongoose.model("Event", eventSchema);

export default Event;