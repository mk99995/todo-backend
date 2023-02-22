const express = require("express");
const userRoutes = require("./src/user/routes");
const todoRoutes = require("./src/todo/routes");
const app = express();
const port = 3001;
const db = require("./db");

require("express-async-errors");
require("dotenv").config();

app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200);
  res.send("asd");
});

app.use("/api/v1", userRoutes);
app.use("/api/v1", todoRoutes);

(async () => {
  await db.connect();
  app.listen(port, () => {
    console.log(`app listening on port ${port}`);
  });
})();

// app.listen(port, () => {
//   console.log(`app listening on port ${port}`);
// });
