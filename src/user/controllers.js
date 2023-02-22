const db = require("../../db");
const queries = require("./queries");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { response } = require("express");

const addUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  const sameEmails = await db
    .query(queries.checkIfUserExists, [email])
    .then((payload) => {
      return payload.rows.length;
    })
    .catch(() => {
      throw new Error("Query failed");
    });
  console.log(sameEmails);
  if (sameEmails > 0) {
    return res.status(400).json({
      error: "email must be unique",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  await db.query(queries.addUser, [email, passwordHash]);
  res.status(201).json(email);
};

const getUsers = async (req, res) => {
  const results = await db
    .query("SELECT * FROM users")
    .then((payload) => {
      return payload.rows;
    })
    .catch(() => {
      throw new Error("Query failed");
    });
  console.log("zxc");
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.send(JSON.stringify(results));
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const idAndPassword = await db
    .query(queries.getIdAndPasswordHash, [email])
    .then((payload) => {
      if (payload.rows.length > 1 || payload.rows.length < 1) {
        return false;
      } else {
        let a = payload.rows;
        console.log(a);
        return payload.rows[0];
      }
    })
    .catch(() => {
      throw new Error("Query failed");
    });

  console.log(idAndPassword);
  if (!idAndPassword) {
    return res.status(401).json({
      error: "invalid email",
    });
  }

  const passwordCorrect = await bcrypt.compare(
    password,
    idAndPassword.password_hash
  );
  if (passwordCorrect) {
    const token = jwt.sign(
      { email: email, id: idAndPassword.id },
      process.env.SECRET
    );

    res.status(200).send({ token });
  } else {
    return res.status(401).json({
      error: "invalid password",
    });
  }
};

const changePassword = async (req, res) => {
  const authorization = req.get("authorization");
  const user = jwt.verify(authorization, process.env.SECRET);
  const { password, newPassword } = req.body;

  const passwordHash = await db
    .query(queries.getPasswordHashByID, [user.id])
    .then((payload) => {
      let a = payload.rows[0].password_hash;
      console.log(a);
      return payload.rows[0].password_hash;
    })
    .catch(() => {
      throw new Error("Query failed");
    });

  const passwordCorrect = await bcrypt.compare(password, passwordHash);
  if (passwordCorrect) {
    const saltRounds = 10;
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);
    db.query(queries.changePassword, [newPasswordHash, user.id]);

    res.status(200).send("password changed");
  } else {
    return res.status(401).json({
      error: "invalid password",
    });
  }
};

module.exports = {
  getUsers,
  addUser,
  login,
  changePassword,
};
