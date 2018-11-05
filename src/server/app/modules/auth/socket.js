export default function (io) {
  io.sockets.on('connection', (socket) => {
    console.log('User connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
}
