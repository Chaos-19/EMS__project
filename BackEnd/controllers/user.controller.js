import User from '../models/user.model.js';
import Ticket from '../models/ticket.model.js';
import Event from '../models/event.model.js';
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

export const deleteUser = async (req, res, next) => {
    try {
        const userIdFromParams = req.params.id;
        const loggedInUserId = req.userId; // User ID from the middleware (VerifiedUser)

        // Check if the logged-in user is trying to delete their own account
        if (userIdFromParams !== loggedInUserId.toString()) {
            return res.status(403).json({ error: 'You are not authorized to delete this account.' });
        }

        const user = await User.findByIdAndDelete(userIdFromParams);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Optionally log the deletion action for auditing purposes
        console.log(`User with ID ${userIdFromParams} deleted.`);

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);  // Log the error for debugging purposes
        next(error); // Pass error to next middleware for centralized error handling    
    }    
};

export const getTickets = async (req, res, next) => {
    try {
        const userId = req.userId; // User ID from the middleware (VerifiedUser)
       
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Find tickets that belong to the user
        const tickets = await Ticket.find({ user: userId });

        if (!tickets || tickets.length === 0) {
            return res.status(404).json({ error: 'No tickets found for this user' });
        }

        res.status(200).json(tickets);
    } catch (error) {
        console.error(error);  // Log the error for debugging purposes
        next(error); // Pass error to next middleware for centralized error handling    
    }    
};


export const getTicketDetails = async (req, res, next) => {
  try {
    const ticketId = req.params.id;
    const userId = req.userId; // User ID from middleware (VerifiedUser)

    // Find the ticket by its ID
    const ticket = await Ticket.findById(ticketId).populate('eventId', 'title date location privacy').populate('userId', 'fullName email');
    
    // Check if the ticket exists
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    // Check if the ticket belongs to the logged-in user
    if (ticket.userId._id.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'You are not authorized to view this ticket' });
    }

    // Prepare the response object
    const ticketDetails = {
      ticketId: ticket._id,
      Event: {
        title: ticket.eventId.title,
        date: ticket.eventId.date,
        location: ticket.eventId.location,
        privacy: ticket.eventId.privacy,  // You may want to display privacy as well
      },
      User: {
        fullName: ticket.userId.fullName,
        email: ticket.userId.email,
      },
      ticketType: ticket.ticketType,
      status: ticket.status,
      numberOfTickets: ticket.numberOfTickets,
      bookingCode: ticket.bookingCode, // Will only be available if the event is private
      bookingDate: ticket.bookingDate,
    };

    res.status(200).json(ticketDetails);
  } catch (error) {
    console.error(error);  // Log the error for debugging purposes
    next(error); // Pass error to next middleware for centralized error handling    
  }
};
