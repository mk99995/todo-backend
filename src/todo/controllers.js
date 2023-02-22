const db = require("../../db");
const queries = require("./queries");
const jwt = require("jsonwebtoken");

const getTodos = async (req, res) => {
  console.log(req.query.status);

  let results;

  if (req.query.status) {
    results = await db
      .query(queries.getTodosByStatus, [req.query.status])
      .then((payload) => {
        return payload.rows;
      })
      .catch(() => {
        throw new Error("Query failed");
      });
  } else {
    results = await db
      .query(queries.getTodos)
      .then((payload) => {
        return payload.rows;
      })
      .catch(() => {
        throw new Error("Query failed");
      });
  }
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.send(JSON.stringify(results));
};

const addTodo = async (req, res) => {
  const authorization = req.get("authorization");
  const user = jwt.verify(authorization, process.env.SECRET);
  const { name, description, status } = req.body;

  await db.query(queries.addTodo, [name, description, user.id, status]);
  res.status(201).send("added todo");
};

const updateTodo = async (req, res) => {
  const authorization = req.get("authorization");
  const user = jwt.verify(authorization, process.env.SECRET);
  const { name, description, status } = req.body;

  console.log(req.params.id);

  let dbId = await db
    .query(queries.getUserId, [req.params.id])
    .then((payload) => {
      return payload.rows[0].user_id;
    })
    .catch(() => {
      throw new Error("Query failed");
    });
  if (dbId === user.id) {
    await db.query(queries.updateTodo, [
      name,
      description,
      status,
      req.params.id,
    ]);

    res.status(202).send("changed todo");
  } else {
    return res.status(400).json({
      error: "something went wrong",
    });
  }
};

const deleteTodo = async (req, res) => {
  const authorization = req.get("authorization");
  const user = jwt.verify(authorization, process.env.SECRET);

  console.log(req.params.id);

  let dbId = await db
    .query(queries.getUserId, [req.params.id])
    .then((payload) => {
      return payload.rows[0].user_id;
    })
    .catch(() => {
      throw new Error("Query failed");
    });
  if (dbId === user.id) {
    await db.query(queries.deleteTodo, [req.params.id]);

    res.status(204).send("changed todo");
  } else {
    return res.status(400).json({
      error: "something went wrong",
    });
  }
};

module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};
