import { Socket } from 'socket.io';

export type Client = { tankIndex: number; socket: Socket };
export type Clients = { [tankId: string]: Client };

export type Tank = { tankDataString: string };

export const clients: Clients = {};
export const tanks: Tank[] = [];

export const add = (tankId: string, socket: Socket) => {
	clients[tankId] = { tankIndex: -1, socket };
};

export const update = (tankId: string, tank: Tank) => {
	const index = clients[tankId].tankIndex;

	if (typeof index !== 'undefined') {
		if (index !== -1) tanks[index] = tank;
		else {
			clients[tankId].tankIndex = tanks.length;
			tanks.push(tank);
		}
	}
};

export const remove = (tankId: string) => {
	const index = clients[tankId].tankIndex;
	delete clients[tankId];
	if (index !== -1) tanks.splice(index, 1);
};

export const hit = (tankId: string, damage: number) => {
	clients[tankId]?.socket?.emit('you-got-hit', damage);
};
