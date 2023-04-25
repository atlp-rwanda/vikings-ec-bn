import { Server } from 'socket.io';

export class SocketUtil {
  static io;
  static socketEmit(key, data) {
    SocketUtil.io.sockets.emit(key, data);
  }
  static config(server) {
    SocketUtil.io = new Server(server, { cors: { origin: '*' } });

    SocketUtil.io.on('connection', (socket) => {
      console.log('User connected', socket.id);
      socket.on('join_room', (data) => {
        socket.join(data);
      });
      socket.on('send_message', (data) => {
        socket.in(data.room).emit('receive_message', data);
      });
      socket.on('typing', (data) => {
        socket.to(data.room).emit('istyping', data);
      });
      socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
      });
    });
    SocketUtil.io.on('disconnect', (socket) => {
      console.log('user disconnected', socket.id);
    });
  }
}
export const knownSockets = {
  notification: 'notification',
};