import { bold, green, red, dim } from 'chalk';
import { Socket, Server } from 'socket.io';

import { add, clients, remove, Tank, update } from './clients';

export default (io: Server, socket: Socket) => {
	console.log(
		bold(green('New connection: ')) +
			socket.id +
			dim(` (Index: ${add(socket)}) [${clients.map((n) => ` ${n.socket.id}`)} ]`),
	);

	socket.on('player-data', (tankDataString: string) => {
		const tank: Tank = { tankDataString, tankData: JSON.parse(tankDataString) };

		update(socket, tank);
	});

	socket.emit('connected');

	socket.on('disconnect', () => {
		const id = remove(socket);
		remove(socket);
		console.log(
			bold(red('Disconnected: ')) +
				socket.id +
				dim(` (Index: ${id}) [${clients.map((n) => ` ${n.socket.id}`)} ]`),
		);
	});
};
