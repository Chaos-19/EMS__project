import cron from "node-cron";


import Event from "../models/event.model.js";
import User from "../models/user.model.js";
import RequestedEvent from "../models/requestedEvent.model.js";

export const createEvent = async (req, res, next) => {
        const {title, description, date, StartTime, location, image, eventType, eventCategory, host} = req.body;
        const userId = req.userId;
        const userRole = req.userRole;
        
        try {

        if(!title || !description || !date || !StartTime || !location || !image || !eventType || !eventCategory || !host){
            return res.status(400).json({error: 'All fields are required!'});
        }


        const existingEvent = await Event.findOne({title});
        const existingRequestedEvent = await RequestedEvent.findOne({title});


        if(existingEvent || existingRequestedEvent){
            return res.status(400).json({error: 'Event already exists!'});
        }
       
        if (userRole === "Admin") {
            const event = new Event({
                title,
                description,
                date,
                StartTime,
                location,
                image,
                eventType,
                eventCategory,
                host,
                createdBy: userId,
            });
            await event.save();
            res.status(201).json(event);
        }
        else {
            const requestedEvent = new RequestedEvent({
                title,
                description,
                date,
                StartTime,
                location,
                image,
                eventType,
                eventCategory,
                host,
                requester: userId,
            });
            
            await requestedEvent.save();
            res.status(201).json(requestedEvent);
        }
    } catch (error) {
        next(error);
    }
};

export const getAllRequestedEvents = async (req, res, next) => {
    const userRole = req.userRole;
    if (userRole !== "Admin") {
        return res.status(403).json({error: 'Access Denied. Only Admins can view all requested events!'});
    }
    try {
        const requestedEvents = await RequestedEvent.find();
        res.status(200).json(requestedEvents);
    } catch (error) {
        next(error);
    }
}

export const approveRequestedEvent = async (req, res, next) => {
    const userRole = req.userRole;
    if (userRole !== "Admin") {
        return res.status(403).json({error: 'Access Denied. Only Admins can approve requested events!'});
    }
    const eventId = req.params.id;
    const { action }= req.body;
    try {
        const requestedEvent = await RequestedEvent.findById(eventId);
        if (!requestedEvent) {
            return res.status(404).json({error: 'Requested event not found!'});
        }

        if(action === "approve"){
            const event = new Event({
                title: requestedEvent.title,
                description: requestedEvent.description,
                date: requestedEvent.date,
                StartTime: requestedEvent.StartTime,
                location: requestedEvent.location,
                image: requestedEvent.image,
                eventType: requestedEvent.eventType,
                eventCategory: requestedEvent.eventCategory,
                host: requestedEvent.host,
                createdBy: requestedEvent.requester,
            }); 
            await event.save();
            await RequestedEvent.findByIdAndDelete(eventId);

            // send an Approval email to the requester
            const user= await User.findById(requestedEvent.requester);
            // await sendEventRequestApprovalEmail(user.email, event.title, action);
            res.status(200).json({ message: "Event approved and created successfully.", event });
        }
        else if (action === "reject") {
            requestedEvent.requestEventStatus = "Rejected";
            await requestedEvent.save();

            // send an Disapproval email to the requester
            const user= await User.findById(requestedEvent.requester);
            // await sendEventRequestRejectionEmail(user.email, requestedEvent.title, action);
            cron.schedule('*/3 * * * *', async () => {
                await RequestedEvent.findByIdAndDelete(eventId);
                console.log(`Requested event with ID ${eventId} has been deleted after 5 minutes.`);
            });
            
            res.status(200).json({ message: "Event request declined.", requestedEvent });
        }
        else
        {
            return res.status(400).json({error: 'Invalid action!'});
        }
    }
    catch (error) {
        next(error);
    }
};