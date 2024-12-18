import User from "../models/user.model.js";

import bcrypt from "bcryptjs"
import crypto from "crypto";

import generateToken from "../utils/Token.js";
import  { sendPasswordResetEmail, 
    sendPasswordResetSuccessEmail,
    sendVerificationEmail,
    sendWelcomeEmail } from "../nodeMailer/email.js";


export const signup = async (req, res, next) => {
    const {name, username, email, password, confirmPassword} = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({error: 'Password do not Match! '});
        }
        const user= await User.findOne({username, email});
        
        if(user){
            return res.status(400).json({error: 'Username or Email Exists!'});
        }
        const hashedPassword = bcrypt.hashSync(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()

        
        const newUser = new User({
            name,
            username, 
            email, 
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 15 * 60 * 1000 // 15 minutes

        });
        try {
            await newUser.save();
            await generateToken(newUser._id, res);

            await sendVerificationEmail(newUser.email, newUser.verificationToken);
            
            res.status(201).json('OTP code successfully sent to your Email!');//newUser.verificationToken);
    } catch (error) {
        next(error);
    }
};

export const verifyEmail = async (req, res, next) => {

    const {code} = req.body;

    try {
         const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })

        if (!user) {
             return res.status(400).json({error: 'Invalid or expired verification code'})
        }
        
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;

        await user.save();

        await sendWelcomeEmail(user.email, user.name );
        res.status(200).json('Email Verified Successfully!')
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    const {username, password} = req.body;
    try {
        const validUser = await User.findOne({username});
        if(!validUser){
            return res.status(400).json({error: 'User does not exist!'});
        }
        const isPassword = await bcrypt.compare(password, validUser.password);
        if(!isPassword){
            return res.status(400).json({error: 'Wrong Credentials!'})
        }
        if(validUser.isVerified === "false"){
            return res.status(400).json({error: 'The User is not Verified'})
        }
        await generateToken(validUser._id, res);
        res.status(200).json({validUser});  
   } catch (error) {
    next(error);
   }
};

export const logOut = async (req, res, next) => {
    try {
        res.clearCookie('User-token');
        res.status(200).json('User successfully loggedout');
    } catch (error) {
        next(error);
    }
}

export const forgotPassword = async (req, res, next) => {
    
    const {email} = req.body;
    
    try {
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({error: "Email not found!"})
        }

        // generate reset token
        const resetToken = crypto.randomBytes(16).toString('hex');
        const resetTokenExpiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();

        // send Email
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(200).json('Password reset link sent successfully!');

    } catch (error) {
        next(error)
    }
}

export const resetPassword = async (req, res, next) => {
    try {
        const { token } = req.params;
        const { password, confirmPassword } = req.body;

       
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired reset token' });
        }

        if (!password || !confirmPassword) {
            return res.status(400).json({ error: 'Password and confirm password are required' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match!' });
        }

    
        const hashedPassword = await bcrypt.hash(password, 10);

      
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiresAt = undefined;

        await user.save();

        try {
            await sendPasswordResetSuccessEmail(user.email);
        } catch (emailError) {
            console.error("Error sending success email:", emailError);
            
        }
        return res.status(200).json({ message: 'Password reset successfully!' });
    } catch (error) {
        next(error); 
    }
};