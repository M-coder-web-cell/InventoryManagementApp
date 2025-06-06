import { app } from './app.js';
import dotenv from 'dotenv';
import path from "path"
import mongoose from "mongoose"
import { neon } from '@neondatabase/serverless';

dotenv.config({ path: path.resolve(process.cwd(), 'server/.env') });
const PORT = process.env.PORT || 8000;


const sql = neon(process.env.POSTGRE_SQL)
mongoose.connect(process.env.MONGO_DB,{
}).then(con=>{
    
    console.log('DB connection successful');
});

const server = app.listen(PORT, () => {
  console.log(`Your App is running on port ${PORT}`);
});
