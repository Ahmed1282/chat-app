import { Server, Socket } from 'socket.io';

// Define the type for users mapping
interface Users {
    [key: string]: string; // Maps user ID to socket ID
}

const users: Users = {}; // This object will store user ID to socket ID mapping

export const setupSocket = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log(`User connected: ${socket.id}`);

        // When a user registers, store their ID and socket ID
        socket.on('register', (data) => {
            const { userId } = JSON.parse(data); // Expecting data to be { userId: string }
            if (!userId) {
                console.log(`Invalid user ID: ${userId}`);
                return;
            }
            users[userId] = socket.id;
            console.log(`User ID ${userId} registered with socket ID: ${socket.id}`);
            io.emit('update_users', Object.keys(users)); // Update all clients with the current list of user IDs
        });

        // Handle sending a message from one user to another
        socket.on('send_message', (data: any) => {
            const { fromId, toId, message } = JSON.parse(data);
            const recipientSocketId = users[toId];
            if (recipientSocketId) {
                io.to(recipientSocketId).emit('receive_message', { fromId, message });
                console.log(`Message from ${fromId} to ${toId}: ${message}`);
            } else {
                console.log(`Recipient ID ${toId} not found`);
            }
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
            for (const userId in users) {
                if (users[userId] === socket.id) {
                    delete users[userId];
                    io.emit('update_users', Object.keys(users)); // Notify all clients of the updated user list
                    break;
                }
            }
        });
    });
};
