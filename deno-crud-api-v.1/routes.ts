import { Router, RouterContext } from 'https://deno.land/x/oak/mod.ts';
import { Response } from 'https://deno.land/x/oak/response.ts';

interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
}

let users: Array<User> = [
    { 
        id: 1,
        firstName: 'bart',
        lastName: 'zalewski',
        username: "b.zalewski",
        email: "bart.zalewski@gmail.com"
    },

	{ 
        id: 2, 
        firstName: 'long', 
        lastName: 'shong', 
        username: "l.shong", 
        email: "long.shong@gmail.com"
    },

	{ 
        id: 3, 
        firstName: 'joe', 
        lastName: 'harrison', 
        username: "j.harrison", 
        email: "joe.harrison@gmail.com"
    },
];

export const getUsers = (context: RouterContext) => {
    context.response.body = users;
}

export const getUser = ({ params, response }: { params: { id: string }, response: any }) => {
    const user = users.filter((user) => user.id === parseInt(params.id))
    if (user.length) {
        response.status = 200
        response.body = user[0]
        return
    }
    response.status = 400;
    response.body = { msg: `Cannot find user with ID: ${params.id}` }
}

export const addUser = async (context: RouterContext) => {
    const body = await context.request.body()
    const { id, firstName, lastName, username, email }: { id: number, firstName: string, lastName: string, username: string, email: string } = body.value
    users.push({
        id: id,
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email
    });
    context.response.body = { msg: 'OK' }
    context.response.status = 200
}

export const updateUser = async (context: RouterContext) => {
    const id = context.params.id
    let response = context.response
    if(id){
        const temp = users.filter((existingUser) => existingUser.id === parseInt(id))
        const body = await context.request.body()
        
        // Update params
        const firstName: string = body.value.firstName;
        const lastName: string = body.value.lastName;
        const username: string = body.value.username;
        const email: string = body.value.email;
    
        if (temp.length) {
            temp[0].firstName = firstName;
            temp[0].lastName = lastName;
            temp[0].username = username;
            temp[0].email = email;
            response.status = 200
            response.body = { msg: 'OK' }
            return
        }
    }

    response.status = 400
    response.body = { msg: `Cannot find user with ID: ${context.params.id}` }
}

type RemoveContext = {
    params: { id: string }
    response: Response
}

export const removeUser = (context: RemoveContext) => {
    const lengthBefore = users.length
    users = users.filter((user) => user.id !== parseInt(context.params.id))
    let response = context.response
    if (users.length === lengthBefore) {
        response.status = 400
        response.body = { msg: `Cannot find user with ID: ${context.params.id}` }
        return
    }
    response.body = { msg: 'OK' }
    response.status = 200
}

export const getHome = (context: RouterContext) => {
    context.response.body = 'Deno CRUD API server is running...'
    context.response.status = 200
}

export const router = new Router()
router
    .get('/', getHome)
    .get('/users', getUsers)
    .get('/users/:id', getUser)
    .post('/users', addUser)
    .put('/users/:id', updateUser)
    .delete('/users/:id', removeUser)