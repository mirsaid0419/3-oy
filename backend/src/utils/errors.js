class ValidationsError extends Error {
  constructor(message) {
    super(message), (this.status = 422);
  }
}

class ServerError extends Error {
  constructor(error) {
    super(error.message), (this.status = 500);
  }
}

class NotFoundError extends Error {
  constructor(message,status=404) {
    super(message), (this.status = status);
  }
}
class ConfliktError extends Error {
  constructor(message) {
    super(message), (this.status = 409);
  }
}
class TokensError extends Error{
  constructor(message,status=401){
    super(message),
    this.status=status
  }
}
class UnauthorizeError extends Error{
  constructor(message,status=401){
    super(message),
    this.status=status
  }
}
export { UnauthorizeError,ValidationsError, ServerError, ConfliktError, NotFoundError, TokensError };
