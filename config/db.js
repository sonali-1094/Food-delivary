import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        console.warn('MONGO_URI not set in environment; database will not connect');
        return Promise.reject(new Error('MONGO_URI not configured'));
    }

    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('DB Connected');
    } catch (err) {
        console.error('DB connection error:', err);
        throw err;
    }
};