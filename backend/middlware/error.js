// // // // // const ErrorResponse = require("../utils/errorResponse");

// // // // // const errorHandler = (err, req, res, next) => {
// // // // //   // Create a copy of the error object
// // // // //   let error = { ...err, message: err.message };

// // // // //   // Handle invalid MongoDB ObjectId
// // // // //   if (err.name === "CastError") {
// // // // //     error = new ErrorResponse(`Resource not found with id: ${err.value}`, 404);
// // // // //   }

// // // // //   // Handle duplicate key error
// // // // //   if (err.code === 11000) {
// // // // //     const duplicateField = Object.keys(err.keyValue).join(", ");
// // // // //     error = new ErrorResponse(
// // // // //       `Duplicate value entered for field(s): ${duplicateField}`,
// // // // //       400
// // // // //     );
// // // // //   }

// // // // //   // Handle Mongoose validation errors
// // // // //   if (err.name === "ValidationError") {
// // // // //     const message = Object.values(err.errors)
// // // // //       .map((val) => val.message)
// // // // //       .join(", ");
// // // // //     error = new ErrorResponse(message, 400);
// // // // //   }

// // // // //   // Default to server error if no specific error is handled
// // // // //   res.status(error.statusCode || 500).json({
// // // // //     success: false,
// // // // //     error: error.message || "Internal Server Error",
// // // // //   });
// // // // // };

// // // // // module.exports = errorHandler;
// // // // const ErrorResponse = require("../utils/errorResponse");

// // // // const errorHandler = (err, req, res, next) => {
// // // //   // Create a copy of the error object
// // // //   let error = { ...err, message: err.message };

// // // //   // Handle invalid MongoDB ObjectId
// // // //   if (err.name === "CastError") {
// // // //     error = new ErrorResponse(`Resource not found with id: ${err.value}`, 404);
// // // //   }

// // // //   // Handle duplicate key error
// // // //   if (err.code === 11000) {
// // // //     const duplicateField = Object.keys(err.keyValue).join(", ");
// // // //     // Agar takroriy maydon email bo'lsa, aniqroq xabar qaytaramiz
// // // //     if (duplicateField === "email") {
// // // //       error = new ErrorResponse("Bu email allaqachon ishlatilgan", 400);
// // // //     } else {
// // // //       error = new ErrorResponse(
// // // //         `Duplicate value entered for field(s): ${duplicateField}`,
// // // //         400
// // // //       );
// // // //     }
// // // //   }

// // // //   // Handle Mongoose validation errors
// // // //   if (err.name === "ValidationError") {
// // // //     const message = Object.values(err.errors)
// // // //       .map((val) => val.message)
// // // //       .join(", ");
// // // //     error = new ErrorResponse(message, 400);
// // // //   }

// // // //   // Default to server error if no specific error is handled
// // // //   res.status(error.statusCode || 500).json({
// // // //     success: false,
// // // //     error: error.message || "Internal Server Error",
// // // //   });
// // // // };

// // // // module.exports = errorHandler;
// // // const ErrorResponse = require("../utils/errorResponse");

// // // const errorHandler = (err, req, res, next) => {
// // //   // Create a copy of the error object
// // //   let error = { ...err, message: err.message };

// // //   // Handle invalid MongoDB ObjectId
// // //   if (err.name === "CastError") {
// // //     error = new ErrorResponse(`Resource not found with id: ${err.value}`, 404);
// // //   }

// // //   // Handle duplicate key error
// // //   if (err.code === 11000) {
// // //     const duplicateField = Object.keys(err.keyValue).join(", ");
// // //     let errorMessage = "";

// // //     // Har bir unique maydon uchun mos xabar
// // //     switch (duplicateField) {
// // //       case "email":
// // //         errorMessage = "Bu email allaqachon ishlatilgan";
// // //         break;
// // //       case "name":
// // //         errorMessage = "Bu kategoriya allaqachon mavjud";
// // //         break;
// // //       // Boshqa unique maydonlar uchun qo'shimcha holatlar qo'shish mumkin
// // //       default:
// // //         errorMessage = `Field(s) "${duplicateField}" uchun takroriy qiymat kiritildi`;
// // //     }

// // //     error = new ErrorResponse(errorMessage, 400);
// // //   }

// // //   // Handle Mongoose validation errors
// // //   if (err.name === "ValidationError") {
// // //     const message = Object.values(err.errors)
// // //       .map((val) => val.message)
// // //       .join(", ");
// // //     error = new ErrorResponse(message, 400);
// // //   }

// // //   // Default to server error if no specific error is handled
// // //   res.status(error.statusCode || 500).json({
// // //     success: false,
// // //     error: error.message || "Internal Server Error",
// // //   });
// // // };

// // // module.exports = errorHandler;
// // // middleware/errorHandler.js
// // const ErrorResponse = require("../utils/errorResponse");

// // const errorHandler = (err, req, res, next) => {
// //   // Xato obyektining nusxasini yaratish
// //   let error = { ...err, message: err.message };

// //   // Handle invalid MongoDB ObjectId
// //   if (err.name === "CastError") {
// //     error = new ErrorResponse(`Resource not found with id: ${err.value}`, 404);
// //   }

// //   // Handle duplicate key error
// //   if (err.code === 11000) {
// //     const duplicateField = Object.keys(err.keyValue).join(", ");
// //     let errorMessage = "";

// //     // Har bir unique maydon uchun mos xabar
// //     switch (duplicateField) {
// //       case "email":
// //         errorMessage = "Bu email allaqachon ishlatilgan";
// //         break;
// //       case "name":
// //         errorMessage = "Bu kategoriya allaqachon mavjud";
// //         break;
// //       default:
// //         errorMessage = `Field(s) "${duplicateField}" uchun takroriy qiymat kiritildi`;
// //     }

// //     error = new ErrorResponse(errorMessage, 400);
// //   }

// //   // Handle Mongoose validation errors
// //   if (err.name === "ValidationError") {
// //     const message = Object.values(err.errors)
// //       .map((val) => val.message)
// //       .join(", ");
// //     error = new ErrorResponse(message, 400);
// //   }

// //   // Agar xato ErrorResponse bo‘lsa, statusCode va message’ni to‘g‘ridan-to‘g‘ri ishlatamiz
// //   if (error.name === "ErrorResponse") {
// //     return res.status(error.statusCode || 500).json({
// //       success: false,
// //       error: error.message || "Internal Server Error",
// //     });
// //   }

// //   // Default to server error if no specific error is handled
// //   console.error("Unhandled error:", error); // Xato loglari uchun
// //   res.status(error.statusCode || 500).json({
// //     success: false,
// //     error: error.message || "Internal Server Error",
// //   });
// // };

// // module.exports = errorHandler;
// const ErrorResponse = require("../utils/errorResponse");

// const errorHandler = (err, req, res, next) => {
//   let error = { ...err, message: err.message };

//   // Mongoose ObjectId xatosi
//   if (err.name === "CastError") {
//     error = new ErrorResponse(`Resource not found with id: ${err.value}`, 404);
//   }

//   // Duplicate key xatosi
//   if (err.code === 11000) {
//     const duplicateField = Object.keys(err.keyValue).join(", ");
//     let errorMessage = "";

//     switch (duplicateField) {
//       case "email":
//         errorMessage = "Bu email allaqachon ishlatilgan";
//         break;
//       case "name":
//         errorMessage = "Bu kategoriya allaqachon mavjud";
//         break;
//       default:
//         errorMessage = `Field(s) "${duplicateField}" uchun takroriy qiymat kiritildi`;
//     }

//     error = new ErrorResponse(errorMessage, 400);
//   }

//   // Validation xatolari
//   if (err.name === "ValidationError") {
//     const message = Object.values(err.errors)
//       .map((val) => val.message)
//       .join(", ");
//     error = new ErrorResponse(message, 400);
//   }

//   // ErrorResponse ni to'g'ri aniqlash
//   if (error instanceof ErrorResponse) {
//     return res.status(error.statusCode || 500).json({
//       success: false,
//       error: error.message || "Internal Server Error",
//     });
//   }

//   console.error("Unhandled error:", error);

//   res.status(500).json({
//     success: false,
//     error: "Internal Server Error",
//   });
// };

// module.exports = errorHandler;
const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  // ❌ let error = { ...err, message: err.message }; // bu instance'ni buzadi
  let error = err; // ✅ to‘g‘ri yo‘l

  // Mongoose xatolar
  if (err.name === "CastError") {
    error = new ErrorResponse(`Resource not found with id: ${err.value}`, 404);
  }

  if (err.code === 11000) {
    const duplicateField = Object.keys(err.keyValue).join(", ");
    let errorMessage = "";

    switch (duplicateField) {
      case "email":
        errorMessage = "Bu email allaqachon ishlatilgan";
        break;
      case "name":
        errorMessage = "Bu kategoriya allaqachon mavjud";
        break;
      default:
        errorMessage = `Field(s) "${duplicateField}" uchun takroriy qiymat kiritildi`;
    }

    error = new ErrorResponse(errorMessage, 400);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    error = new ErrorResponse(message, 400);
  }

  // 🔥 Asosiy tuzatish shu yerda
  if (error instanceof ErrorResponse) {
    return res.status(error.statusCode).json({
      success: false,
      error: error.message,
    });
  }

  console.error("Unhandled error:", err);
  console.error("Unhandled error:", err); // 👈 AYNI MANASHU YERGA YOZILADI

  res.status(500).json({
    success: false,
    error: "Internal Server Error",
  });
};
module.exports = errorHandler;
