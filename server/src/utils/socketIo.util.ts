import { Server as HttpServer } from 'http';
import { Server as SocketIoServer, Socket } from 'socket.io';

export const initializeSocketIo = (httpServer: HttpServer) => {
  const io = new SocketIoServer(httpServer, {
    // Options de configuration si nécessaire
  });

  io.on('connection', (socket: Socket) => {
    console.log('Un client est connecté', socket.id);

    // Ajoutez ici la logique pour gérer les événements de socket
    socket.on('message', (data) => {
      console.log(data);
      // Gérer les messages reçus, par exemple, les stocker en base de données et les renvoyer aux autres clients
      io.emit('message', data);
    });

    socket.on('disconnect', () => {
      console.log('Un client est déconnecté', socket.id);
    });
  });
};
