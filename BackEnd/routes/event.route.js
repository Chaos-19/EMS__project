import express from "express";
import VerifiedUser from "../middleware/VerifiedUser.Middleware.js";
import { approveRequestedEvent, 
    createEvent, 
    deleteEvent, 
    exportEventData, 
    getAllEvents, 
    getAllRequestedEvents, 
    getEventDetails, 
    getEventsByCategory, 
    getEventStats, 
    getEventTickets, 
    getMyEvent, 
    ticketBooking, 
    updateEvent } 
    from "../controllers/event.controller.js";



const router = express.Router();

router.get("/", getAllEvents);
router.post("/create", VerifiedUser, createEvent);
router.get("/category/:category", getEventsByCategory);
router.get("/requested-event", VerifiedUser, getAllRequestedEvents);
router.post("/approve-event/:id", VerifiedUser, approveRequestedEvent);
router.post("/my-events", VerifiedUser, getMyEvent);
router.get("/my-event/id", VerifiedUser, getEventDetails);
router.put("/update-event/:id", VerifiedUser, updateEvent);
router.post("/tickets/:id", VerifiedUser, ticketBooking);
router.delete("/delete-event/:id", VerifiedUser, deleteEvent);
/*----------------- for status reporting ----------------- */
router.get("/events/:id/tickets", VerifiedUser, getEventTickets);   // Get all tickets for an event
router.get("/events/:id/stats", VerifiedUser, getEventStats);       // Get event statistics (tickets sold, revenue, etc.)
router.get("/events/:id/export", VerifiedUser, exportEventData);   // Export event data to CSV



export default router;