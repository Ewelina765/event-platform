const { BaseException } = require("./base.exceptions");

class UserAlreadyExistException extends BaseException {
  constructor() {
    super(400, "User already exist");
  }
}
module.exports = { UserAlreadyExistException };
