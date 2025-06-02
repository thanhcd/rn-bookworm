import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import job from './lib/cron.js';

import authRoutes from './routes/authRoutes.js';
import { connectDB } from './lib/db.js';
import bookRoutes from './routes/bookRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

job.start(); // Bắt đầu cron job
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
