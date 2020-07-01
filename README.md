## deno-crud-api

Classical CRUD API implemented in deno.
For run and test this APIs, type this command in your shell:
```bash
./startup.sh
```
For semplicity, I create a simple script that execute the command for run in dev mode this APIs.

This script (<b>startup.sh</b>) show a simple menu with the user can choose if run 1st script (<b> api.ts </b>) or 2nd script (<b> app.ts </b>)

## Testing API

Open Postman and test all HTTP calls of this APIs

### api.ts
<ul>
  <li> <b> GET - </b> http://locahost:5000/users (List of all users) </li>
  <li> <b> GET - </b> http://locahost:5000/users/:id (Details of a single user identified by ID) </li>
  <li> <b> POST - </b> http://localhost:5000/users (Add user) </li>
  <li> <b> DELETE - </b> http://localhost:5000/users (Remove user) </li>
</ul>

### app.ts
<ul>
  <li> <b> GET - </b> http://localhost:4000/users (List of all users) </li>
  <li> <b> GET - </b> http://localhost:4000/users/:id (Details of a single user identified by ID) </li>
  <li> <b> POST - </b> http://localhost:4000/users (Add user) </li>
  <li> <b> PUT - </b> http://localhost:4000/users/:id (Update user identified by ID) </li>
  <li> <b> DELETE - </b> http://localhost:4000/:id (Remove user identified by ID) </li>
</ul>
