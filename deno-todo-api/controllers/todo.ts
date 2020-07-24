import { v4 } from 'https://deno.land/std/uuid/mod.ts';

import Todo from '../interfaces/Todo.ts';
import todos from '../data/todos.ts';

export default {
	getAll({ response } : { response: any }) => {
		response.status = 200;
		response.body = { data: todos };
		console.log(todos);		
	}

	create: async ({ request, response } : { request: any; response: any }, ) => {
		const body = await request.body();
		if (!request.hasBody) {
			response.status = 400;
			response.body = { message: 'Please provide the task detail and status' };
			return;	
		}
		let newTodo: Todo = {
			id: v4.generate(),
			task: body.value.task,
			done: false,
		};
		let data = [...todos, newTodo];
		response.body = { data };
		todos.push(newTodo);
		console.log(JSON.stringfy(todos));
		response.body = { message: 'element added with success' };
		response.status = 200;
	},

	getById: ({ params, response } : { params: { id: string }; response: any },) => {
		const todo: Todo | undefined = todos.find((t) => {
			return t.id === params.id;
		});
		if (!todo) {
			response.status = 400;
			response.body = { 'No task found with given ID' };
			return;
		}
		response.status = 200;
		response.body = { data: todo };
	},

	update: async ({ params, request, response } : { params: {id: string }, request: any, response: any },) => {
		const todo: Todo | undefined = todos.find((t) => t.id === params.id);
		if (!todo) {
			response.status = 400;
			response.body = { message: 'No element found' };
			return;
		}
		const body = await request.body();
		const updatedTodo = { task?: string, done?:boolean } = body.value;
		let newTodos = todos.map((t) => {
			return t.id === params.id ? { ...t, ...updatedTodo } : t
		});
		response.status = 200;
		response.body = { data:  newTodos };
	},
	
	delete ({ params, response } : { params: { id: string }; response: any }, ) => {
		const allTodos = todos.filter((t) => t.id !== params.id);
		response.status = 200;
		response.body = { data: allTodos, };
	},
};
}
