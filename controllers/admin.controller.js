import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import JobListingModel from '../models/jobListing.model.js';
import { ApiError } from '../utils/ApiError.js';

// The initial endpoint to confirm access and load basic data
export const getAdminDashboardData = asyncHandler(async (req, res) => {

     const userData = {
          id: req.user._id,
          name: req.user.name,
          role: req.user.role
     };

     res.status(200).json(
          new ApiResponse(200, userData, "Welcome to the Admin Dashboard!")
     );
});

// job creation controller
export const createJobListing = asyncHandler(async (req, res) => {
     try {
          // recieve all req
          const { title, description, category, applyLink } = req.body;

          // creating job listing
          const newJob = await JobListingModel.create({
               title, description, category, applyLink, postedDate: new Date(),
               isActive: true
          });

          res.status(201).json(
               new ApiResponse(201, newJob, "Job listing created successfully.")
          );
     } catch (error) {
          throw new ApiError(500, "Internal Server Error")
     }
})

export const deleteJobListing = asyncHandler(async (req, res) => {

     try {
          // recive jobId from request
          const id = req.params.jobsId;

          // delete by id
          const deleteResult = await JobListingModel.deleteOne({ _id: id })

          if (deleteResult.deletedCount === 0) {
               return res.status(404).json(
                    new ApiResponse(404, null, "Job listing not found")
               );
          }

          res.status(200).json(
               new ApiResponse(200, null, "Jobs deleted successfully")
          );
     } catch (error) {
          throw new ApiError(500, "Internal Server Error")
     }
})

export const updateJobListing = asyncHandler(async (req, res) => {

})