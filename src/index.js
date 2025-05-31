import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/authRoutes.js';
import { connectDB } from './lib/db.js';
import bookRoutes from './routes/bookRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // cần thiết để đọc JSON body

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
