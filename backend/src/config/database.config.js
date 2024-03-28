import { connect, set } from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();


set('strictQuery', true);

export const dbconnect = async () => {
    try {
        await connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
    }
};
