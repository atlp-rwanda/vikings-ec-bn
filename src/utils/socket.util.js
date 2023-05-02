import { Server } from 'socket.io';
import { ChatService } from '../services/chat.service';

export class SocketUtil {
  static io;
  static socketEmit(key, data) {
    SocketUtil.io.sockets.emit(key, data);
  }
  static config(server) {
    SocketUtil.io = new Server(server, { cors: { origin: '*'} });

    SocketUtil.io.on('connection', (socket) => {
      console.log('User connected', socket.id);
      socket.on('join_room', (data) => {
        socket.join(data);
      });
      socket.on('send_message', async (newMessage) => {
        const sentMessage = await ChatService.getOneMessage(newMessage.data.id);
        socket.in(newMessage.room).emit('receive_message', sentMessage);
      });
      socket.on('typing', (data) => {
        socket.broadcast.emit('istyping', data);
        console.log('Start typing',  socket.id);
      });
    
      socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
      });
    });
  }
}
export const knownSockets = {
  notification: 'notification',
};