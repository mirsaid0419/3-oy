class ValidationsError extends Error {
  constructor(message, status = 422) {
    super(message), (this.status = status);
  }
}

class ServerError extends Error {
  constructor(error, status = 500) {
    super(error.message), (this.status = status);
  }
}

class NotFoundError extends Error {
  constructor(message, status = 404) {
    super(message), (this.status = status);
  }
}
class ConfliktError extends Error {
  constructor(message, status = 409) {
    super(message), (this.status = status);
  }
}
class ForbiddenError extends Error {
  constructor(message, status = 403) {
    super(message), (this.status = status);
  }
}
class TokensError extends Error {
  constructor(message, status = 401) {
    super(message), (this.status = status);
  }
}
class BadRequest extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}

class UnauthorizeError extends Error {
  constructor(message, status = 401) {
    super(message), (this.status = status);
  }
}
export {
  BadRequest,
  UnauthorizeError,
  ValidationsError,
  ServerError,
  ConfliktError,
  NotFoundError,
  TokensError,
  ForbiddenError
};
