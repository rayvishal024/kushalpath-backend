import mongoose from "mongoose";

const marketStatSchema = new mongoose.Schema({
     enrollStudent: {
          type: Number,
          required: true,
          default: 0,
          min: 0
     },
     courseOffer: {
          type: Number,
          required: true,
          default: 0,
          min: 0
     },
     totalFaculty: {
          type: Number,
          required: true,
          default: 0,
          min: 0
     },
     studyMaterialCount: {
          type: Number,
          required: true,
          default: 0,
          min: 0
     },
     successRate: {
          type: Number,
          required: true,
          default: 0,
          min: 0
     },
     totalCity: {
          type: Number,
          required: true,
          default: 0,
          min: 0
     }
}, { timestamps: true }
);

const marketStatModel = mongoose.model('MarketStat', marketStatSchema);

export default marketStatModel;