import express from "express";
import VerifiedUser from "../middleware/VerifiedUser.Middleware.js";
import { approveRequestedEvent, createEvent, getAllRequestedEvents } from "../controllers/event.controller.js";

const router = express.Router();

router.post("/create", VerifiedUser, createEvent);
router.get("/requested-event", VerifiedUser, getAllRequestedEvents);
router.post("/approve-event/:id", VerifiedUser, approveRequestedEvent);


export default router;