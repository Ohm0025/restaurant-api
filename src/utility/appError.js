module.exports = class AppError extends Error {
  constructor(message, statusCode, errorName) {
    super(message);
    this.statusCode = statusCode;
    if (errorName) {
      this.name = errorName;
    }
  }
};
