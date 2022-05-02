export type Clients = { [tankId: string]: number };
export type Tank = { tankDataString: string };

export const clients: Clients = {};
export const tanks: Tank[] = [];

export const add = (tankId: string) => {
	clients[tankId] = -1;
};

export const update = (tankId: string, tank: Tank) => {
	const index = clients[tankId];

	if (typeof index !== 'undefined') {
		if (index !== -1) tanks[index] = tank;
		else {
			clients[tankId] = tanks.length;
			tanks.push(tank);
		}
	}
};

export const remove = (tankId: string) => {
	const index = clients[tankId];
	delete clients[tankId];
	if (index !== -1) {
		tanks.splice(index, 1);
	}
};
