import mongoose from "mongoose";
import dotenv from 'dotenv'


dotenv.config();

const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;

if (!DB_URL || !DB_NAME) {
     throw new Error("DB_URL or DB_NAME is missing in environment variables");
}

const connDB = async () => {
     try {
          await mongoose.connect(`${DB_URL}/${DB_NAME}`, {
               useNewUrlParser: true,
               useUnifiedTopology: true
          })
          
     } catch (error) {
          console.log("DB-Conn Error :: Error while DB-Connect", error.message);
          process.exit(1);
     }
}

export default connDB;