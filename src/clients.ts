import { Socket } from 'socket.io';

import TankData from './tankDataType';

export type Client = { socket: Socket; tankIndex: number };
export type Tank = { tankDataString: string; tankData: TankData };

export const clients: Client[] = [];
export const tanks: Tank[] = [];

export const add = (socket: Socket) => {
	clients.push({ socket, tankIndex: -1 });
	return clients.length - 1;
};

export const update = (socket: Socket, tank: Tank) => {
	const index = clients.findIndex((n) => n.socket.id === socket.id);
	if (clients[index]) {
		const { tankIndex } = clients[index];
		if (tankIndex !== -1) tanks[tankIndex] = tank;
		else {
			clients[index].tankIndex = tanks.length;
			tanks.push(tank);
		}
	}
	return index;
};

export const remove = (socket: Socket) => {
	const clientIndex = clients.findIndex((n) => n.socket === socket);
	if (clientIndex !== -1) {
		const { tankIndex } = clients[clientIndex];
		clients.splice(clientIndex, 1);
		if (tankIndex !== -1) tanks.splice(tankIndex, 1);
	}
	return clientIndex;
};
