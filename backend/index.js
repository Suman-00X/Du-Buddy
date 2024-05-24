import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

//route import
import userRoutes from './Routes/userRoutes.js';
import sessionRoutes from './Routes/sessionRoutes.js';

dotenv.config();

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/sessions', sessionRoutes);

// MongoDB Connection + Listen
mongoose.connect(process.env.MONGO_URI, )
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.error('Error connecting to MongoDB:', error.message));