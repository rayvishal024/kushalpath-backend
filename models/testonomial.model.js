import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
     image: {
          type: String,
          required: true,
          trim : true
     },
     headline: {
          type: String,
          trim : true
     },
     subHeadline: {
          type: String,
         trim : true
     },
     order: {
          type: Number,
          min: 1,
          max: 5,
          unique: true,
          required : true
     }
}, { timestamps: true });

const testimonialModel = mongoose.model('Testimonial', testimonialSchema);

export default testimonialModel;