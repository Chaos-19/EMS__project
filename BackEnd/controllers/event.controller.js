import Event from "../models/event.model.js";
import RequestedEvent from "../models/requestedEvent.model.js";

export const createEvent = async (req, res, next) => {
        const {title, description, date, StartTime, location, image, eventType} = req.body;
        if(!title || !description || !date || !StartTime || !location || !image || !eventType){
            return res.status(400).json({error: 'All fields are required!'});
        }
        const existinEvent = await Event.findOne({title});
        if(existingEvent){
            return res.status(400).json({error: 'Event already exists!'});
        }
       
        const event = new Event({title, description, date, StartTime, location, image, eventType});
    try {
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        next(error);
    }
};