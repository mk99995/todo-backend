# todo-backend

<h3>Setup (requires Docker and Docker Compose):</h3>

<p>1. Clone repository</p>

<p>2. Add .env file with SECRET to the root folder</p>

<p>3. Run "docker-compose up --build" in the root folder</p>

<p>If docker-compose up gives errors running it again usually fixes it.</p>
<br/>

<h3>HTTP methods:</h3>

<p>-POST /api/v1/signup: Sing up new user</p>

<p>-POST /api/v1/signin: Login old user and get jwt</p>

<p>-PUT /api/v1/changePassword: Change user's password</p>

<p>-GET /api/v1/todos?status=[status]: Get a list of todo items</p>

<p>-POST /api/v1/todos: Create a new todo item</p>

<p>-PUT /api/v1/todos/:<zero-width space>id: Update a todo item</p>

<p>-DELETE /api/v1/todos/:<zero-width space>id: Delete a todo item</p>

<p>I haven't had the time to write errors properly so server crashes sometimes when inadequate request is made. With Nodemon server can easily be restarted by saving some project file.</p>
