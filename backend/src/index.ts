import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import sequelize from './config/db';
import userRoutes from './routes/userRoutes'; // Import your routes

// Initialize Express app
const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173' // Replace with your frontend URL
}));

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Use your routes
app.use('/api/users', userRoutes);


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173' // Replace with your frontend URL
    }
});

// Store connected users
interface Users {
    [key: string]: string;
}

const users: Users = {};

io.on('connection', (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    // When a user joins, store their username
    socket.on('register', (data) => {
        const username = data.trim();
        if (username === '') {
            console.log(`Invalid username: ${username}`);
            return;
        }
        users[username] = socket.id;
        console.log(`${username} registered with ID: ${socket.id}`);
        io.emit('update_users', Object.keys(users));
    });

    // Handle sending a message from one user to another
    socket.on('send_message', (data: any) => {
        const { from, to, message } = JSON.parse(data);
        const recipientSocketId = users[to];
        io.to(recipientSocketId).emit('receive_message', { from, message });
        console.log(`Message from ${from} to ${to}: ${message}`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
        for (const username in users) {
            if (users[username] === socket.id) {
                delete users[username];
                io.emit('update_users', Object.keys(users)); 
                break;
            }
        }
    });
});

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
