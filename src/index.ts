import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import { Server } from 'socket.io';

config();

// App setup
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;
const app = express();

app.use(express.json());
app.use(cors());

const server = app.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}`);
});

// Socket setup
const io = new Server(server, {
	cors: {
		origin: '*',
	},
});

let count = 0;

io.on('connection', (socket) => {
	console.log(`New socket connection: ${socket.id}`);
	console.log(socket);

	socket.on('counter', () => {
		count += 1;
		io.emit('counter', count);
	});
});
