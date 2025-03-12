const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Kategoriya nomi kiritish majburiy"],
      unique: true,
      maxlength: [50, "Kategoriya nomi 50 belgidan oshmasligi kerak"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, "Tavsif 200 belgidan oshmasligi kerak"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("categoryModel", categorySchema);
