import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './db/db.js';
import userRoutes from './routes/auth.route.js'
import messageRouter from './routes/message.route.js'
import { app, server } from './lib/socket.js';

dotenv.config();

const PORT = process.env.PORT || 4000;

const URL = process.env.FRONTEND_URL || "https://mern-realtime-chat-app-sage.vercel.app";

app.use(cookieParser());
app.use(express.json({ limit: "10mb" })); // Increase JSON payload size limit
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cors({
    origin: [URL], // Ensure correct frontend URL
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true
}));

// ✅ Handle Preflight Requests
app.options("*", cors({
    origin: [URL],
    credentials: true
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", URL);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

app.use('/api/auth', userRoutes)
app.use('/api/messages', messageRouter)

app.use('/', (req, res) => {
    res.send("welcome to the backend")
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB()
})