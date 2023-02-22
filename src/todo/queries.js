const getTodos = "SELECT * FROM todos";
const addTodo = `INSERT INTO todos (name, description, user_id, created, updated, status) VALUES ($1, $2, $3, to_timestamp(${Date.now()} / 1000.0), to_timestamp(${Date.now()} / 1000.0), $4)`;
const getUserId = "SELECT user_id from todos WHERE id = $1";
const updateTodo = `UPDATE todos SET name = $1, description = $2, updated = to_timestamp(${Date.now()} / 1000.0), status = $3 WHERE id = $4`;
const deleteTodo = "DELETE FROM todos WHERE id = $1";
const getTodosByStatus = "SELECT * FROM todos WHERE status = $1";

module.exports = {
  getTodos,
  addTodo,
  getUserId,
  updateTodo,
  deleteTodo,
  getTodosByStatus,
};
