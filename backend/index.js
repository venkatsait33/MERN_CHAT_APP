import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './db/db.js';
import userRoutes from './routes/auth.route.js'
import messageRouter from './routes/message.route.js'

dotenv.config();
const app = express();

const PORT = process.env.PORT || 4000;

const URL = " http://localhost:5173"

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: URL,
    credentials: true
}));

app.use('/api/auth', userRoutes)
app.use('/api/message', messageRouter)

app.use('/', (req, res) => {
    res.send("welcome to the backend")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB()
})