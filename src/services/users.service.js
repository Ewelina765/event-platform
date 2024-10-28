const {
  InvalidCredentialsExceptions,
} = require("../exceptions/invalid-credentials.exception");
const {
  getUserRecord,
  createUserRecord,
} = require("../repositories/users.respository");
const { createToken } = require("./jwt.service");
const bcrypt = require("bcrypt");

async function createUser(ctx) {
  try {
    const { email, name, surname, password } = ctx.request.body;

    // Validate inputs
    if (!email || !name || !surname || !password) {
      ctx.status = 400;
      ctx.body = "All fields (email, name, surname, password) are required";
      return;
    }

    // Hash the password
    const hash = await bcrypt.hash(password, 10);

    // Call repository function and pass ctx.state.connection
    const [id] = await createUserRecord(
      { email, name, surname, password: hash },
      ctx.state.connection // Passing connection explicitly
    );

    if (!id) {
      ctx.status = 500;
      ctx.body = "Error creating user";
      return;
    }

    // Create a token
    const token = await createToken(id);

    // Respond with the token
    return { token };
  } catch (error) {
    console.error("Error in createUser:", error.message || error); // Log the error
    ctx.status = 500;
    ctx.body = {
      error: "An error occurred while creating the user",
      details: error.message,
    };
  }
}

async function validateUser(ctx) {
  try {
    const { email, password } = ctx.request.body;

    // Validate inputs
    if (!email || !password) {
      ctx.status = 400;
      ctx.body = "Email and password are required";
      return;
    }

    // Retrieve the user record from the database
    const user = await getUserRecord(email, ctx.state.connection); // Pass connection explicitly

    // If user does not exist or password doesn't match, return an error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new InvalidCredentialsExceptions();
    } else {
      // Generate a token
      const token = await createToken(user.id);

      return { token };
    }
  } catch (error) {
    console.error("Error in validateUser:", error.message || error); // Log the error
    ctx.status = 500;
    ctx.body = {
      error: "An error occurred while validating the user",
      details: error.message,
    };
  }
}

module.exports = {
  createUser,
  validateUser,
};
