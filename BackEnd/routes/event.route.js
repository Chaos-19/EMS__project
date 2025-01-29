import express from "express";
import VerifiedUser from "../middleware/VerifiedUser.Middleware.js";
import { approveRequestedEvent, createEvent, getAllRequestedEvents, getEventDetails, getMyEvent, updateEvent } from "../controllers/event.controller.js";



const router = express.Router();

router.post("/create", VerifiedUser, createEvent);
router.get("/requested-event", VerifiedUser, getAllRequestedEvents);
router.post("/approve-event/:id", VerifiedUser, approveRequestedEvent);
router.post("/my-events", VerifiedUser, getMyEvent);
router.get("/my-event/id", VerifiedUser, getEventDetails);
router.put("/update-event/:id", VerifiedUser, updateEvent);


export default router;