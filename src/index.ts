import { bold, cyan, underline } from 'chalk';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import { Server } from 'socket.io';

import { tanks } from './clients';
import socketRouter from './socketRouter';

config();

// App setup
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;
const app = express();

app.use(express.json());
app.use(cors());

const server = app.listen(PORT, () => {
	console.log(bold(underline(cyan(`\nListening on http://localhost:${PORT}\n`))));
});

// Socket setup
const io = new Server(server, {
	cors: {
		origin: '*',
	},
});

io.on('connection', (socket) => {
	socketRouter(io, socket);
});

setInterval(() => {
	io.emit('tanks-data', ...tanks.map((n) => n.tankDataString));
}, 30);
