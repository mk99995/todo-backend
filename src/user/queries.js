const checkIfUserExists = "SELECT * FROM users WHERE email = $1";
const getIdAndPasswordHash =
  "SELECT id, password_hash FROM users WHERE email = $1";
const addUser = `INSERT INTO users (email, password_hash, created, updated) VALUES ($1, $2, to_timestamp(${Date.now()} / 1000.0), to_timestamp(${Date.now()} / 1000.0))`;
const changePassword = `UPDATE users SET password_hash = $1, updated = to_timestamp(${Date.now()} / 1000.0) WHERE id = $2`;
const getPasswordHashByID = "SELECT password_hash FROM users WHERE id = $1";

module.exports = {
  checkIfUserExists,
  addUser,
  getIdAndPasswordHash,
  changePassword,
  getPasswordHashByID,
};
