import { Server } from 'socket.io';
import { UserStatusMapType, UserConnections } from '../interfaces/socket';
import MessageService from '../services/messages';

const userStatus: UserStatusMapType = {};
const users: Record<number, UserConnections> = {};

export const setupSocket = (io: Server) => {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    const userIdQuery = socket.handshake.query.userId as string;
    const userId = userIdQuery ? Number(userIdQuery) : undefined;

    if (userId !== undefined) {
      userStatus[userId] = { socketId: socket.id, status: 'active' };
      users[userId] = { userId, socket: { socketId: socket.id } };

      console.log(`User ${userId} is now active with socket ${socket.id}`);

      io.emit('user_status_update', { userId, status: 'active' });

      io.emit('active_users', Object.keys(userStatus).map(id => ({
        userId: Number(id),
        status: userStatus[Number(id)].status,
      })));
    } else {
      console.warn('No userId provided in the handshake query');
    }

    socket.on('send_message', async (data) => {
      const { fromId, toId, message } = data;

      try {
        const newMessage = await MessageService.postMessage(fromId, toId, message);
        const created_at = newMessage.created_at ? newMessage.created_at.toISOString() : new Date().toISOString();

        const messageData = {
          fromId,
          toId,
          message,
          created_at,
        };

        const recipientSocket = users[toId]?.socket;

        if (recipientSocket) {
          io.to(recipientSocket.socketId).emit('receive_message', messageData);
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
      for (const userId in users) {
        if (users[Number(userId)].socket.socketId === socket.id) {
          delete userStatus[userId];
          delete users[Number(userId)];
          io.emit('user_status_update', { userId: Number(userId), status: 'inactive' });
          break;
        }
      }
    });
  });
};
