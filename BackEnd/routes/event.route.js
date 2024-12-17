import express from "express";


const router = express.Router();

router.post("/createEvent/:userid", createEvent);
router.post("/requestEvent", RequestEvent);

export default router;