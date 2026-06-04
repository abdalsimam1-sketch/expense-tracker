class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class BadRequest extends CustomError {
  constructor(message) {
    super(message, 400);
  }
}

class Unauthorized extends CustomError {
  constructor(message) {
    super(message, 401);
  }
}

class NotFound extends CustomError {
  constructor(message) {
    super(message, 404);
  }
}

module.exports = { CustomError, BadRequest, Unauthorized, NotFound };
