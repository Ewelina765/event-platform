const Router = require("@koa/router");
const { createToken } = require("../services/jwt.service");
const {
  tokenValidatorMiddleware,
} = require("../middlewares/token-validator.middleware");
const { createUser, validateUser } = require("../services/users.service");

const userMgmtController = new Router();

// Register user route
userMgmtController.post("/register", async (ctx) => {
  try {
    const body = await createUser(ctx);
    ctx.body = body; // Properly assign the response to ctx.body
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "An error occurred while creating the user" };
  }
});

// Login user route
userMgmtController.post("/login", async (ctx) => {
  try {
    const body = await validateUser(ctx);
    ctx.body = body; // Properly assign the response to ctx.body
  } catch (error) {
    ctx.status = 401;
    ctx.body = { error: "Invalid credentials" };
  }
});

// Validate user token route
userMgmtController.post(
  "/validate",
  tokenValidatorMiddleware,
  async (ctx) => {
    try {
      // const { connection } = ctx.state;
      const users = await connection("users").select(); // Fix .select() function call
      ctx.body = users; // Return the list of users
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: "An error occurred while validating the token" };
    }
  }
);

module.exports = { userMgmtController };
