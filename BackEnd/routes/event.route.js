import express from "express";
import VerifiedUser from "../middleware/VerifiedUser.Middleware.js";
import { createEvent } from "../controllers/event.controller.js";

const router = express.Router();

router.post("/create", VerifiedUser, createEvent);


export default router;