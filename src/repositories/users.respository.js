const {
  UserAlreadyExistException,
} = require("../exceptions/user-already-exist.exception");

async function createUserRecord(user, connection) {
  try {
    const id = await connection("users").insert(user).returning("id");
    return id;
  } catch (e) {
    if (e.code === "23505") {
      throw new UserAlreadyExistException();
    }
    throw e;
  }
}

async function getUserRecord(email, connection) {
  const user = await connection("users").where({ email }).first();
  return user;
}

module.exports = {
  createUserRecord,
  getUserRecord,
};
