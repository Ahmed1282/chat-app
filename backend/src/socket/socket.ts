import { Server, Socket } from 'socket.io';

interface Users {
    [userId: number]: string;
}

const users: Users = {};

export const setupSocket = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on('register', (data) => {
            try {
                const { userId } = JSON.parse(data);
                if (typeof userId !== 'number') return;
                users[userId] = socket.id;
                io.emit('update_users', Object.keys(users));
            } catch (error) {
                console.error('Error processing registration:', error);
            }
        });

        socket.on('send_message', (data: any) => {
            try {
                const { fromId, toId, message } = JSON.parse(data);
                if (typeof fromId !== 'number' || typeof toId !== 'number' || typeof message !== 'string') return;
                const created_at = new Date().toISOString();
                const messageData = { fromId, message, created_at };

                const recipientSocketId = users[toId];
                const senderSocketId = users[fromId];

                if (recipientSocketId) {
                    io.to(recipientSocketId).emit('receive_message', messageData);
                }

                if (senderSocketId) {
                    io.to(senderSocketId).emit('receive_message', messageData);
                }
            } catch (error) {
                console.error('Error processing message:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
            for (const userId in users) {
                if (users[userId] === socket.id) {
                    delete users[Number(userId)];
                    io.emit('update_users', Object.keys(users));
                    break;
                }
            }
        });
    });
};
