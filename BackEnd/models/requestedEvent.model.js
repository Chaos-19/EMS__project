import mongoose from "mongoose";

const requestedEventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
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
    requestEventStatus: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
    },
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    
},{timestamps: true});


const RequestedEvent = mongoose.model("RequestedEvent", requestedEventSchema);

export default RequestedEvent;