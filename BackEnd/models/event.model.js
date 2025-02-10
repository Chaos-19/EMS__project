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
        type: [String],
        required: true,
    },
    eventType: {
        type: String,
        required: true,
        enum: ["Private", "Public"],  // Specifies if the event is private or public
    },
    eventCategory: {
        type: String,
        required: true,
        enum: ["Concert", "Wedding", "Party", "Conference", "Others"],
    },
    eventStatus: {
        type: String,
        required: true,
        enum: ["Active", "Pending", "Cancelled", "Ended"],
        default: "Pending",  // Default status is Pending before approval
    },
    host: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    bookingCode: {  // Only used for private events
        type: String,
        required: function () { return this.eventType === "Private"; },
    },
    locked: {  // Locking the event after approval
        type: Boolean,
        default: false,  // False by default, set to true once the event is approved
    },
}, {timestamps: true});

const Event = mongoose.model("Event", eventSchema);

export default Event;
