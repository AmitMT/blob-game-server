import { bold, green, red, dim } from 'chalk';
import { Socket, Server } from 'socket.io';

const clients: { socket: Socket }[] = [];

export default (io: Server, socket: Socket) => {
	clients.push({ socket });
	console.log(
		bold(green('New connection: ')) +
			socket.id +
			dim(` (Index: ${clients.length - 1}) [${clients.map((n) => ` ${n.socket.id}`)} ]`),
	);

	socket.emit('connected', clients.length - 1);

	socket.on('disconnect', () => {
		const id = clients.findIndex((n) => n.socket === socket);

		clients.splice(id, 1);
		console.log(
			bold(red('Disconnected: ')) +
				socket.id +
				dim(` (Index: ${id}) [${clients.map((n) => ` ${n.socket.id}`)} ]`),
		);
	});
};
