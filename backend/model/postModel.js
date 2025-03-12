const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Sarlavha kiritish majburiy"],
      maxlength: [200, "Sarlavha 200 belgidan oshmasligi kerak"],
    },
    content: {
      type: String,
      required: [true, "Kontentni kiritish majburiy"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: userModel,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: categoryModel,
      required: true,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: userModel,
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: commentModel,
      },
    ],
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("postModel", postSchema);
