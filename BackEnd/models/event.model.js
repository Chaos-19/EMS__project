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
    eventStatus: {
        type: String,
        enum: ["Active", "Pending", "Cancelled","Ended"],
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {timestamps: true});

const Event = mongoose.model("Event", eventSchema);

export default Event;