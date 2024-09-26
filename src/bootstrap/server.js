import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from '../routes/authRoutes.js';
import ticketRoutes from '../routes/ticketRoutes.js';
import { errorHandler } from '../app/middleware/errorHandler.js';
import connectDB from '../lib/config/db.js';




// Load environment variables
dotenv.config();


// Connect to MongoDB
connectDB();

const app = express();

app.use(express.json());
// Middleware for authentication

// Routes
app.use('/auth', authRoutes);
app.use('/tickets', ticketRoutes); // Protect these routes later

// Error handling middleware
app.use(errorHandler);

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on sound`);
});

// Export the app and server
export { app, server };
