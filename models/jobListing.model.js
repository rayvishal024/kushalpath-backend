import mongoose from "mongoose";

const jobListingSchema = new mongoose.Schema({
     title: {
          type: String,
          required: true,
          trim:true
     },
     description: {

          type: String,
          required: true,
     },
     category: {
          type: String,
          required: true,
          enum: ["government", "private", "internship", "apprenticeship", "other"]
     },
     applyLink: {
          type: String,
          required: true
     },
     isActive: {
          type: Boolean,
          default: true
     }
},{ timestamps: true })

const JobListingModel = mongoose.model("JobListing", jobListingSchema);

export default JobListingModel;