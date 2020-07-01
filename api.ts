import { Application } from 'https://deno.land/x/abc@v1.0.0-rc10/mod.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts';

let users = [
	{ id: '1', firstName: 'bart', lastName: 'zalewski', username: "b.zalewski", email: "bart.zalewski@gmail.com"},
	{ id: '2', firstName: 'long', lastName: 'shong', username: "l.shong", email: "long.shong@gmail.com"},
	{ id: '3', firstName: 'joe', lastName: 'harrison', username: "j.harrison", email: "joe.harrison@gmail.com"},
];

const getUsers = (context: any) => context.json(users);

// Method for getting clients
const getUser = (context: any) => {
	const { id } = context.params;
	const user = users.find((user) => user.id === id);
	user ? context.json(user) : context.string('No user with that ID. ');
};

// Method for adding a user
const addUser = async (context: any) => {
	const { firstName, lastName, username, email } = await context.body();
	const id = v4.generate();
	const user = { id, firstName, lastName, username, email};
	users.push(user);
	return context.json(user);
}

// Method for removing a user
const removeUser = (context: any) => {
	const { id } = context.params;
	const user = users.find((user) => user.id === id);
	if (user) {
		users = users.filter((user) => user.id !== id);
		return context.json(user)
	}
	return context.string('No client with that ID. ');
};

const app = new Application();
app.get('/clients', getUsers)
	.get('clients/:id', getUser)
	.post('/clients', addUser)
	.delete('/clients/:id', removeUser)
	.start({ port: 5000 });

