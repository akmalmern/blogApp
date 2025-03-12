const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    constent: {
      type: String,
      required: [true, "contentni nimadur yozing"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "postModel",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
      },
    ],
  },

  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("commentModel", commentSchema);
