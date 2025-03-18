const Post = require("../model/postModel");
const { post } = require("../routes/userRouter");
const ErrorResponse = require("../utils/errorResponse");

const addPost = async (req, res, next) => {
  try {
    const { title, content, category } = req.body;
    const image = req.file ? req.file.filename : null;
    const newPost = await Post.create({
      title,
      content,
      author: req.user?.id,
      category,
      image,
    });
    res.status(201).json({
      success: true,
      message: "post yaratildi",
      post: newPost,
    });
  } catch (error) {
    next(error);
  }
};

const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate("author", "userName image")
      .populate("category", "name")
      .sort({ createdAt: -1 });
    if (posts.length === 0) {
      return next(new ErrorResponse("Postlar topilmadi", 404));
    }
    res.status(200).json({
      success: true,
      message: "postlar",
      posts,
    });
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { title, content, category } = req.body;

    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      return next(new ErrorResponse("Bunday ID bilan post topilmadi", 404));
    }
    if (post.author.toString() !== req.user.id) {
      return next(
        new ErrorResponse("Faqat post muallifi uni yangilay oladi", 403)
      );
    }
    const image = req.file?.filename || post.image;
    const postData = {
      title: title || post.title,
      content: content || post.content,
      category: category || post.category,
      image,
    };
    const newPost = await Post.findByIdAndUpdate(post._id, postData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "post yangilandi",
      post: newPost,
    });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return next(new ErrorResponse("post topilmadi", 404));
    }
    await Post.findByIdAndDelete(post);
    res.status(200).json({
      success: true,
      message: "post o'chirildi",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { addPost, getPosts, updatePost, deletePost };
