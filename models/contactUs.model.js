import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema({
     name: {
          type: String,
          required : true,
          trim : true
     },
     email: {
          type: String,
          lowercase : true,
          required : true,
          trim: true
     },
     mobile: {
          type: String,
          required: true,
          trim : true
     },
     message: {
          type: String,
          maxLength: 600,
          trim : true
     }
}, { timestamps: true });

const contactUsModel = mongoose.model('ContactUs', contactUsSchema);

export default contactUsModel;