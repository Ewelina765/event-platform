const { BaseException } = require("./base.exceptions");

class InvalidCredentialsExceptions extends BaseException {
  constructor() {
    super(401, "Email or password does not exist");
  }
}
module.exports = { InvalidCredentialsExceptions };
