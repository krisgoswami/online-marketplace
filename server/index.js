import express from 'express';
import cors from 'cors';
import connectDB from './dbconfig/connectdb.js';
import userRoute from './routes/userRoutes.js'
import commonRoute from './routes/commonRoutes.js'
import { Server } from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // frontend port
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log("A user connected");

    socket.on('disconnect', () => {
        console.log("User disconnected");
    })
})

//connect db
connectDB();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/common', commonRoute);

//port 
const PORT = process.env.PORT || 8080;

//websocket init
server.listen(3001, () => {
    console.log(`Websocket server running on localhost:3001`);
})

//listen to port 
app.listen(PORT, () => {
    console.log(`Server started on localhost:${PORT}`);
})