import dotenv from 'dotenv'
import connDB from './db/db-conn.js';
import app from './app.js';

// config ENV
dotenv.config({ path: './.env' });

// PORT
const PORT = process.env.PORT || 4000;

// Connect DB 
connDB()
     .then(() => {
          app.listen(PORT, () => {
               console.log(`Server is Running at ${PORT} & DB connected successfully`);
          })
     })
     .catch((error) => {
          console.log("Failed to connect with DB ", error.message)
          process.exit(1);
     });