import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
     // rate for star out of 5
     rate: {
          type: Number,
          min: 0,
          max: 5,
          required : true
     },
     message: {
          type: String,
          maxLength: 200,
          trim: true,
          required : true
     },
     studentId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref : User
     }
}, {timeseries : true});

const FeedbackModel = mongoose.model('Feedback', feedbackSchema);