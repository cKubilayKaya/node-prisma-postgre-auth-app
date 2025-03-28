export class CustomError extends Error {
  constructor(message, statusCode, additionalFields = {}) {
    super(message);
    this.statusCode = statusCode;

    Object.assign(this, additionalFields);
  }
}
