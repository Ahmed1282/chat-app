import { Server, Socket } from 'socket.io';

// Define the type for users mapping
interface Users {
    [userId: number]: string; // Maps user ID (number) to socket ID (string)
}

const users: Users = {}; // This object will store user ID to socket ID mapping

export const setupSocket = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log(`User connected: ${socket.id}`);

        // When a user registers, store their ID and socket ID
        socket.on('register', (data) => {
            try {
                const { userId } = JSON.parse(data); // Expecting data to be { userId: number }
                if (typeof userId !== 'number') {
                    console.log(`Invalid user ID received: ${userId}`);
                    return;
                }
                users[userId] = socket.id;
                console.log(`User ID ${userId} registered with socket ID: ${socket.id}`);
                io.emit('update_users', Object.keys(users)); // Update all clients with the current list of user IDs
                console.log('Users list emitted to all clients:', Object.keys(users));
            } catch (error) {
                console.error('Error processing registration:', error);
            }
        });

        // Handle sending a message from one user to another
        socket.on('send_message', (data: any) => {
            try {
                const { fromId, toId, message } = JSON.parse(data);
                if (typeof fromId !== 'number' || typeof toId !== 'number') {
                    console.log(`Invalid user IDs received: fromId=${fromId}, toId=${toId}`);
                    return;
                }
                console.log(`Sending message from ${fromId} to ${toId}: ${message}`);
                
                const recipientSocketId = users[toId];
                const senderSocketId = users[fromId];

                if (recipientSocketId) {
                    io.to(recipientSocketId).emit('receive_message', { fromId, message });
                    console.log(`Message successfully sent to ${toId}`);
                } else {
                    console.log(`Recipient ID ${toId} not found in users mapping`);
                }

                if (senderSocketId) {
                    io.to(senderSocketId).emit('receive_message', { fromId, message });
                    console.log(`Message successfully sent to sender ${fromId}`);
                } else {
                    console.log(`Sender ID ${fromId} not found in users mapping`);
                }
            } catch (error) {
                console.error('Error processing message:', error);
            }
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
            for (const userId in users) {
                if (users[userId] === socket.id) {
                    delete users[Number(userId)]; // Convert userId to number before deleting
                    io.emit('update_users', Object.keys(users)); // Notify all clients of the updated user list
                    console.log(`User ID ${userId} removed from users mapping`);
                    console.log('Updated users list emitted to all clients:', Object.keys(users));
                    break;
                }
            }
        });
    });
};
