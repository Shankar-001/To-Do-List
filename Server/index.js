import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './Config/db.js';
import todoRoutes from './Routes/todoRoutes.js';

dotenv.config();

connectDB();
const app = express();
app.use(express.json());

app.use(cors()); // stop cross-origin errors

app.use('/api/todo', todoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on ${PORT}`));
