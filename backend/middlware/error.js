// // const ErrorResponse = require("../utils/errorResponse");

// // const errorHandler = (err, req, res, next) => {
// //   // Create a copy of the error object
// //   let error = { ...err, message: err.message };

// //   // Handle invalid MongoDB ObjectId
// //   if (err.name === "CastError") {
// //     error = new ErrorResponse(`Resource not found with id: ${err.value}`, 404);
// //   }

// //   // Handle duplicate key error
// //   if (err.code === 11000) {
// //     const duplicateField = Object.keys(err.keyValue).join(", ");
// //     error = new ErrorResponse(
// //       `Duplicate value entered for field(s): ${duplicateField}`,
// //       400
// //     );
// //   }

// //   // Handle Mongoose validation errors
// //   if (err.name === "ValidationError") {
// //     const message = Object.values(err.errors)
// //       .map((val) => val.message)
// //       .join(", ");
// //     error = new ErrorResponse(message, 400);
// //   }

// //   // Default to server error if no specific error is handled
// //   res.status(error.statusCode || 500).json({
// //     success: false,
// //     error: error.message || "Internal Server Error",
// //   });
// // };

// // module.exports = errorHandler;
// const ErrorResponse = require("../utils/errorResponse");

// const errorHandler = (err, req, res, next) => {
//   // Create a copy of the error object
//   let error = { ...err, message: err.message };

//   // Handle invalid MongoDB ObjectId
//   if (err.name === "CastError") {
//     error = new ErrorResponse(`Resource not found with id: ${err.value}`, 404);
//   }

//   // Handle duplicate key error
//   if (err.code === 11000) {
//     const duplicateField = Object.keys(err.keyValue).join(", ");
//     // Agar takroriy maydon email bo'lsa, aniqroq xabar qaytaramiz
//     if (duplicateField === "email") {
//       error = new ErrorResponse("Bu email allaqachon ishlatilgan", 400);
//     } else {
//       error = new ErrorResponse(
//         `Duplicate value entered for field(s): ${duplicateField}`,
//         400
//       );
//     }
//   }

//   // Handle Mongoose validation errors
//   if (err.name === "ValidationError") {
//     const message = Object.values(err.errors)
//       .map((val) => val.message)
//       .join(", ");
//     error = new ErrorResponse(message, 400);
//   }

//   // Default to server error if no specific error is handled
//   res.status(error.statusCode || 500).json({
//     success: false,
//     error: error.message || "Internal Server Error",
//   });
// };

// module.exports = errorHandler;
const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  // Create a copy of the error object
  let error = { ...err, message: err.message };

  // Handle invalid MongoDB ObjectId
  if (err.name === "CastError") {
    error = new ErrorResponse(`Resource not found with id: ${err.value}`, 404);
  }

  // Handle duplicate key error
  if (err.code === 11000) {
    const duplicateField = Object.keys(err.keyValue).join(", ");
    let errorMessage = "";

    // Har bir unique maydon uchun mos xabar
    switch (duplicateField) {
      case "email":
        errorMessage = "Bu email allaqachon ishlatilgan";
        break;
      case "name":
        errorMessage = "Bu kategoriya allaqachon mavjud";
        break;
      // Boshqa unique maydonlar uchun qo'shimcha holatlar qo'shish mumkin
      default:
        errorMessage = `Field(s) "${duplicateField}" uchun takroriy qiymat kiritildi`;
    }

    error = new ErrorResponse(errorMessage, 400);
  }

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    error = new ErrorResponse(message, 400);
  }

  // Default to server error if no specific error is handled
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
