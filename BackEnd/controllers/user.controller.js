import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

// Email validation function
const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
};

export const updateProfile = async (req, res, next) => {
    try {
        const userIdFromParams = req.params.id;
        const loggedInUserId = req.userId; // User ID from the middleware (VerifiedUser)

        // Check if the logged-in user is trying to update their own profile
        if (userIdFromParams !== loggedInUserId.toString()) {
            return res.status(403).json({ error: 'You are not authorized to update this profile.' });
        }

        const user = await User.findById(userIdFromParams);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { fullName, username, email, password, profilePic } = req.body;

        // Validate email format
        if (email && !validateEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Only update fields that are provided in the request body
        if (fullName) user.fullName = fullName;
        if (username) user.username = username;
        if (email) user.email = email;

        if (password) {
            // Hash the password before saving
            try {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);
            } catch (error) {
                return res.status(500).json({ error: 'Error hashing the password' });
            }
        }

        if (profilePic) user.profilePic = profilePic;

        // Save updated user data
        try {
            await user.save();
            res.status(200).json({
                message: 'User updated successfully',
                user: {
                    fullName: user.fullName,
                    username: user.username,
                    email: user.email,
                    profilePic: user.profilePic,
                }
            });
        } catch (error) {
            return res.status(500).json({ error: 'Error saving the user data' });
        }

    } catch (error) {
        next(error); // Pass error to next middleware for centralized error handling
    }
};
