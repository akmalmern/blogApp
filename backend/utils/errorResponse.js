// class ErrorResponse extends Error {
//   constructor(message, codeStatus) {
//     super(message);
//     this.codeStatus = codeStatus;
//   }
// }

// module.exports = ErrorResponse;
class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ErrorResponse";
  }
}

module.exports = ErrorResponse;
