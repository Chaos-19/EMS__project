import Event from "../models/event.model.js";
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