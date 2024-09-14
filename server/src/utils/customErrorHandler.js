class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.data = null;
    this.message = message;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

class NotFoundError extends ApiError {
  constructor(message) {
    super(404, message);
  }
}
class ValidationError extends ApiError {
  constructor(message) {
    super(400, message);
  }
}

module.exports = { ApiError, NotFoundError, ValidationError };
