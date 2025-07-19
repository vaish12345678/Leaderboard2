import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from 'dotenv';
dotenv.config();
import userRoutes from "./Routes/userRoutes.js"

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,             
}));
app.use(express.json());

 app.use("/api",userRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch(err => console.error(err));
