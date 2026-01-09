import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import FoodRouter from './routes/foodRoute.js';

dotenv.config();

// app config
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(cors());

// serve uploaded images folder
app.use('/uploads', express.static('uploads'));

// api endpoints
app.use('/api/food', FoodRouter);
app.get('/', (req, res) => res.send('Hello World'));
app.use("/images", express.static("uploads"));
// start server after DB connects
const start = async () => {
    try {
        await connectDB();
        app.listen(port, () => console.log(`Server is running on port ${port}`));
    } catch (err) {
        console.error('Failed to start server:', err.message);
        process.exit(1);
    }
};

start();