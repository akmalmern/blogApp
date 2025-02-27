const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Isimni kiritishingiz kerak!"],
    },
    email: {
      type: String,
      required: [true, "Emailingizni kiritishingiz kerak!"],
    },
    password: {
      type: String,
      required: [true, "Paro'lingizni kiritishingiz kerak!"],
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "role faqat 'user', yoki 'admin' bo'lishi mumkin",
      },
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("userModel", userSchema);
