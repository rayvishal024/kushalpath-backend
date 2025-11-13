import {asyncHandler} from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const getuserDashboardData = asyncHandler(async (req, res) => {

     const userData = {
          id: req.user._id,
          name: req.user.name,
          role: req.user.role
     };

     res.status(200).json(
          new ApiResponse(200, userData, "Welcome to the Student Dashboard!")
     );
});