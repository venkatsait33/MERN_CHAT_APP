import { Server } from "socket.io";
import http from "http";
import express from 'express'
import dotenv from 'dotenv';
dotenv.config();


const url = "https://mern-realtime-chat-app-sage.vercel.app" || process.env.FRONTEND_URL
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [url],
        methods: ["GET", "POST"],
        credentials: true,
    }
});



export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

// use to store online users
const userSocketMap = {} // {userId: socketId}

io.on('connection', (socket) => {
    //console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) {
        userSocketMap[userId] = socket.id;
    }
    // io.emit() is used to emit to all connected clients or users
    io.emit("getOnlineUsers", Object.keys(userSocketMap))
    socket.on('disconnect', () => {
        // console.log("a user disconnected", socket.id);
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

export { io, app, server }