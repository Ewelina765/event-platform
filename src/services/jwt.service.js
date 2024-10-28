const jwt = require("jsonwebtoken");
const secret = "jnxkjsnkjsbdjbsdjb";

async function createToken(userId) {
  const payload = {
    userId,
  };
  console.log("payload ", payload);
  return new Promise((resolve) =>
    jwt.sign(payload, secret, { expiresIn: "1h" }, (err, val) => {
      if (err) {
        //TODO: exception
        throw new Error(`token sign failed: ${err.message}`);
      }
      resolve(val);
    })
  );
}
async function validateToken(userId) {
  return new Promise((resolve) =>
    jwt.verify(token, secret, (err, val) => {
      if (err) {
        //TODO: unauthorized exception
        throw new Error(`token sign failed: ${err.message}`);
      }
      resolve(val);
    })
  );
}

module.exports = { createToken, validateToken };
