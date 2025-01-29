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

export const getMyEvent = async (req, res, next) => {
    const userRole = req.userRole;
    const userId = req.userId; // Assuming userId is set by middleware

    // Validate userId
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        let events;
        if (userRole === "Admin") {
            events = await Event.find();
        } else {
            const approvedEvents = await Event.find({ createdBy: userId });
            const pendingEvents = await RequestEvent.find({ createdBy: userId });
            events = [...approvedEvents, ...pendingEvents];
        }

        if (events.length === 0) {
            return res.status(404).json({ error: 'No events found for this user' });
        }

        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
};

export const getEventDetails = async (req, res, next) => {
    const userRole = req.userRole;  
    const userId = req.userId;  
    const eventId = req.params.id;  
    
    try {
        let event;
        
        // Admin can view any event, whether approved or requested
        if (userRole === "Admin") {
            event = await Event.findById(eventId);
        } else {
            // For a regular user, fetch from requestedEvent or Event schema based on user
            event = await Event.findOne({ _id: eventId, createdBy: userId }) || 
                    await RequestedEvent.findOne({ _id: eventId, createdBy: userId });
        }

        // If no event found, return a 404 error
        if (!event) {
            return res.status(404).json({ error: 'Event not found or access denied' });
        }

        res.status(200).json(event);
    } catch (error) {
        next(error);
    }
};

export const updateEvent = async (req, res, next) => {
    const userRole = req.userRole; // User's role (admin or user)
    const userId = req.userId; // User's ID (assumed to be passed as a parameter or from authentication)
    const eventId = req.params.id; // Event ID to update
    const { title, description, date, StartTime, location, image, eventType, eventCategory, host } = req.body;

    try {
        let event;

        // Admin can only update events from the Event schema
        if (userRole === "Admin") {
            // Admin can only update events from the Event schema (approved)
            event = await Event.findById(eventId);

            // If not found in Event schema, return 404
            if (!event) {
                return res.status(404).json({ error: 'Event not found or access denied' });
            }

            // Admin can only update their own event, not others'
            if (event.createdBy.toString() !== userId.toString()) {
                return res.status(403).json({ error: 'Access Denied. You can only update your own event!' });
            }
        } else {
            // User can update events in both the Event or RequestedEvent schema
            event = await Event.findById(eventId) || await RequestedEvent.findById(eventId);

            // If not found in either schema, return 404
            if (!event) {
                return res.status(404).json({ error: 'Event not found or access denied' });
            }

            // User can only update their own event, regardless of whether it's approved or pending
            if (event.createdBy.toString() !== userId.toString()) {
                return res.status(403).json({ error: 'Access Denied. You can only update your own event!' });
            }
        }

        // Update the event details
        event.title = title;
        event.description = description;
        event.date = date;
        event.StartTime = StartTime;
        event.location = location;
        event.image = image;
        event.eventType = eventType;
        event.eventCategory = eventCategory;
        event.host = host;

        // Save the updated event
        await event.save();

        res.status(200).json({ message: 'Event updated successfully', event });

    } catch (error) {
        next(error);
    }
};

export const deleteEvent = async (req, res, next) => {
    const userRole = req.userRole; // User's role (admin or user)
    const userId = req.userId; // User's ID (assumed to be passed as a parameter or from authentication)
    const eventId = req.params.id; // Event ID to delete

    try {
        let event;

        // both admin and user can delete events
        if (userRole === "Admin") {
            event = await Event.findById(eventId);
        } else {
            event = await Event.findById(eventId) || await RequestedEvent.findById(eventId);
        }

        // If not found in either schema, return 404
        if (!event) {
            return res.status(404).json({ error: 'Event not found or access denied' });
        }

        // User can only delete their own event, regardless of whether it's approved or pending
        if (event.createdBy.toString() !== userId.toString()) {
            return res.status(403).json({ error: 'Access Denied. You can only delete your own event!' });
        }

        // Delete the event
        await event.deleteOne();

        res.status(200).json({ message: 'Event deleted successfully' });

    } catch (error) {
        next(error);
    }
};

export const ticketBooking = async (req, res, next) => {
    const userRole = req.userRole; // User's role (admin or user)
    const userId = req.userId; // User's ID (assumed to be passed as a parameter or from authentication)
    const eventId = req.params.id; // Event ID to delete

    try {
        let event;

        // both admin and user can delete events
        if (userRole === "Admin") {
            event = await Event.findById(eventId);
        } else {
            event = await Event.findById(eventId) || await RequestedEvent.findById(eventId);
        }

        // If not found in either schema, return 404
        if (!event) {
            return res.status(404).json({ error: 'Event not found or access denied' });
        }

        // User can only delete their own event, regardless of whether it's approved or pending
        }catch (error) {            
            next(error);
        }
    };



