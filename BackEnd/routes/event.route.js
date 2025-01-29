import express from "express";
import VerifiedUser from "../middleware/VerifiedUser.Middleware.js";
import { approveRequestedEvent, 
    createEvent, 
    deleteEvent, 
    getAllEvents, 
    getAllRequestedEvents, 
    getEventDetails, 
    getEventsByCategory, 
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


export default router;