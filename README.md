# todo-backend

Setup requires Docker and Docker Compose:

1. clone repository

2. add .env file with SECRET to the root folder

3. run "docker-compose up --build" in the root folder

If docker-compose up gives errors running it again usually fixes it.
\\
\\
HTTP methods:

-POST /api/v1/signup: Sing up new user

-POST /api/v1/signin: Login old user and get jwt

-PUT /api/v1/changePassword: Change user's password

-GET /api/v1/todos?status=[status]: Get a list of todo items. Optionally, a status query param can be included to return only items of specific status. If not present, return all items

-POST /api/v1/todos: Create a new todo item

-PUT /api/v1/todos/:<zero-width space>id: Update a todo item

-DELETE /api/v1/todos/:<zero-width space>id: Delete a todo item

I haven't had the time to write errors properly so server crashes sometimes when inadequate request is made. With Nodemon server can easily be restarted by saving some project file.
