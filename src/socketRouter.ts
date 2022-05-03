import { bold, green, dim, red } from 'chalk';
import { Socket, Server } from 'socket.io';

import { add, clients, update, remove } from './clients';

export default (io: Server, socket: Socket) => {
	const tankId = socket.handshake.auth.tankId as string;

	add(tankId);

	socket.emit('connected');

	console.log(`${bold(green('New connection: ')) + tankId}\n${dim(`[${Object.keys(clients)}]`)}\n`);

	socket.on('update-tank-data', (tankDataString: string) => {
		update(tankId, { tankDataString });
	});

	socket.on('disconnect', () => {
		remove(tankId);

		console.log(`${bold(red('Disconnected: ')) + tankId}\n${dim(`[${Object.keys(clients)}]`)}\n`);
	});
};
