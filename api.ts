import { Application } from 'https://deno.land/x/abc@v1.0.0-rc10/mod.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts';

let clients = [
	{ id: '1', firstName: 'bart', lastName: 'zalewski' },
	{ id: '2', firstName: 'long', lastName: 'shong' },
	{ id: '3', firstName: 'joe', lastName: 'harrison' },
];

const getClients = (ctx: any) => ctx.json(clients);

// GET CLIENTS
const getClient = (ctx: any) => {
	const { id } = ctx.params;
	const client = clients.find((c) => c.id === id);
	client ? ctx.json(client) : ctx.string('No client with that ID. ');
};

// ADD A CLIENT
const addClient = async (ctx: any) => {
	const { firstName, lastName } = await ctx.body();
	const id = v4.generate();
	const client = { id, firstName, lastName };
	clients.push(client);
	return ctx.json(client);
}

// REMOVE CLIENT
const removeClient = (ctx: any) => {
	const { id } = ctx.params;
	const client = clients.find((c) => c.id === id);
	if (client) {
		clients = clients.filter((c) => c.id !== id);
		return ctx.json(client)
	}
	return ctx.string('No client with that ID. ');
};

const app = new Application();
app.get('/clients', getClients).get('clients/:id', getClient).post('/clients', addClient).delete('/clients/:id', removeClient).start({ port: 5000 });

