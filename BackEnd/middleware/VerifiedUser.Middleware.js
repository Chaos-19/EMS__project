import jwt from 'jsonwebtoken';
import  User  from '../models/user.model.js';
import { errorHandler } from '../utils/ErrorHandler.js';


const VerifiedUser = async (req, res, next) => {
    try {
        const token = req.cookies.user_token;
        if(!token){
            return next(errorHandler(401, "Unauthorized"));
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await User.findById(decoded.userId);
        if(!user){
            return next(errorHandler(403, "Forbidden"));
        }
        req.userId = user._id;
        req.userRole = user.role;
        next();
    } catch (error) {
        res.status(401).json(error);
    }
}

export default VerifiedUser;