import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import sequelize from './config/db';
import userRoutes from './routes/userRoutes'; 
import messageRoutes from './routes/messageRoutes'; 
import chatRoutes from './routes/chatRoutes'; 
import userschatRoutes from './routes/userschatRoutes'
import { setupSocket } from './socket/socket'; 

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173' 
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


app.use('/api/users', userRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/users-chat', userschatRoutes);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173' 
    }
});

setupSocket(io);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('DB Connection has been established successfully.');
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
