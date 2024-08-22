import express, { Application } from 'express';
import http, { Server as HttpServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import cors from 'cors';
import apiRoutes from './routes/index'; 
import { setupSocket } from './socket/socket';
import './config/db'; 
const port = process.env.SERVER_PORT || 3000;

const app: Application = express();

app.use(cors({
    origin: '*' 
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use('/v1', apiRoutes); 

const server: HttpServer = http.createServer(app);
const io: SocketServer = new SocketServer(server, {
    cors: {
        origin: '*' 
    }
});

setupSocket(io);

(async () => {
    try {
      server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    } catch (error) {
      console.error('Unable to start the server:', error);
    }
  })();

