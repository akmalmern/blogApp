const Post = require("../model/postModel");
const { post } = require("../routes/userRouter");
const ErrorResponse = require("../utils/errorResponse");
const fs = require("fs").promises;
const path = require("path");

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
      .populate({
        path: "comments",
        select: "comment author",
        populate: {
          path: "author",
          select: "userName image",
        },
      })
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

// user joylagan postlarini ko'rish
const getUserPosts = async (req, res, next) => {
  try {
    // 1. Foydalanuvchiga tegishli postlarni olish
    const posts = await Post.find({ author: req.user.id }).sort({
      createdAt: -1,
    });

    // 2. Agar postlar bo‘lmasa, xabar berish
    if (!posts.length) {
      return next(new ErrorResponse("Sizda hali postlar yo'q", 404));
    }

    // 3. Javob qaytarish
    res.status(200).json({
      success: true,
      postlar: posts.length,
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

    // Eski rasmni o‘chirish (faqat yangi rasm yuklansa)
    const newImage = req.file?.filename;
    if (newImage && post.image) {
      const oldImagePath = path.join(__dirname, "..", "uploads", post.image);
      try {
        await fs.unlink(oldImagePath); // ✅ Asinxron o‘chirish
      } catch (err) {
        console.error("Eski rasmni o‘chirishda xato:", err);
      }
    }

    // Yangilangan post ma’lumotlari
    const postData = {
      title: title?.trim() || post.title,
      content: content?.trim() || post.content,
      category: category?.trim() || post.category,
      image: newImage || post.image,
    };

    const newPost = await Post.findByIdAndUpdate(post._id, postData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Post yangilandi",
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

module.exports = { addPost, getPosts, updatePost, deletePost, getUserPosts };
