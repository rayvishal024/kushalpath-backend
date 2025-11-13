import { ApiError } from '../utils/ApiError.js'; 

const errorMiddleware = (err, req, res, next) => {

     // --- 1. Set Default Values and Identify Error Type ---

     let statusCode = err.statusCode || 500;
     let message = err.message || "Internal Server Error";
     let errors = err.errors || [];

     // If the error is not an instance of our known ApiError, 
     // we assume it's a technical/unknown error 
     if (!(err instanceof ApiError)) {
          // If we are in production, mask the internal error message
          if (process.env.NODE_ENV === 'production') {
               statusCode = 500;
               message = "An unexpected error occurred on the server.";
               errors = [];
          }
     }

     // --- 2. Send the Standardized JSON Response ---

     // Always log the full technical error in the backend for debugging
     if (process.env.NODE_ENV === 'development') {
          console.error("Critical Server Error:", err);
     }

     // Send the final, masked or specific JSON response
     return res.status(statusCode).json({
          statusCode: statusCode,
          message: message,
          data: null,
          success: false,
          errors: errors
     });
};

export default errorMiddleware;