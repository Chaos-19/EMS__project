import express from "express";
import { 
    forgotPassword, login, 
    logOut,
    resendVerificationCode,
    resetPassword, 
    signup, 
    verifyEmail } from "../controllers/auth.controller.js";





const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logOut);

router.post("/verify-email", verifyEmail);
router.post("/resend-verification-code", resendVerificationCode);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);


export default router;