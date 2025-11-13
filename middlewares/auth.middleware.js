import jwt from 'jsonwebtoken'
import UserModel from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.js'

// protect routes setup
export const protectRoute = async (req, res, next) => {  
     try {
          // 1. Access & check token
          const token = req.cookies.token;

          if (!token) {
                return next(new ApiError(401, "Please log in to access this resource."));
          }

          // 2. Decode the token 
          const decoded = jwt.verify(token, process.env.JWT_SECRET)

     
          // 3. Finding user with this id 
          const user = await UserModel.findById(decoded.id).select('-password');
          
          if (!user) {
               return next(new ApiError(401, "User not found or token invalid."));
          }

          // 4. Attach user object & call next..
          req.user = user;
          next();

     } catch (error) {
          // If JWT is expired or verification fails
          if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
               return next(new ApiError(401, "Session expired. Please log in again."));
          }

          // Re-throw the error to be caught by the global error handler
          next(error);
     }
}

// admin check routes
export const adminCheck = (req, res, next) => {
    
     if (!req.user || req.user.role !== 'admin') {
          return next(new ApiError(403, "Forbidden: Admin access is required."));
     }
     next();
}