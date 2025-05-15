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
    const populatedComment = await newComment.populate(
      "author",
      "userName image"
    );

    res.status(200).json({
      success: true,
      message: "comment qo'shildi",
      comment: populatedComment,
    });
  } catch (error) {
    next(error);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const comm = await Comment.findById(id);
    if (!comm) {
      return next(new ErrorResponse("comment topilmadi", 404));
    }

    if (comm.author.toString() !== req.user.id) {
      return next(
        new ErrorResponse("Siz faqat o'z kommentingizni yangilay olasiz", 403)
      );
    }

    const newComment = { comment: comment?.trim() || comm.comment };
    const neww = await Comment.findByIdAndUpdate(id, newComment, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      message: "comment yangilandi",
      comment: neww,
    });
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const commet = await Comment.findById(id);
    if (!commet) {
      return next(new ErrorResponse("comment topilmadi", 404));
    }
    if (commet.author.toString() !== req.user.id) {
      return next(
        new ErrorResponse("Siz faqat o'z kommentingizni yangilay olasiz", 403)
      );
    }
    await Comment.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "comment o'chirildi",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { addComment, updateComment, deleteComment };
