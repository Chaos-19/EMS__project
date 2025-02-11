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
        type: [String],
        
    },
    eventType: {
        type: String,
        required: true,
        enum: ["Private", "Public"],
    },
    eventStatus: {
        type: String,
        required: true,
        enum: ["Active", "Pending", "Cancelled","Ended"],
        default: "Pending",
    },
    requestEventStatus: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
    },
    host:{
        type: String,
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
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    
},{timestamps: true});


const RequestedEvent = mongoose.model("RequestedEvent", requestedEventSchema);

export default RequestedEvent;