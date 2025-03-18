const Post = require("../model/postModel");
const Comment = require("../model/commentModel");
const ErrorResponse = require("../utils/errorResponse");

const addComment = async (req, res, next) => {
  try {
    const { comment } = req.body;
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post || post.length === 0) {
      return next(new ErrorResponse("BUnday post topilmadi", 404));
    }

    const newComment = await Comment.create({
      comment: comment.trim(),
      author: req.user.id,
      post: id,
    });

    await Post.findByIdAndUpdate(
      id,
      { $push: { comments: newComment._id } },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "comment qo'shildi",
      comment: newComment,
    });
  } catch (error) {
    next(error);
  }
};
