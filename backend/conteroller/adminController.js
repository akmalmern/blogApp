const Post = require("../model/postModel");
const User = require("../model/userModel");
const Comment = require("../model/commentModel");
const ErrorResponse = require("../utils/errorResponse");
const fs = require("fs").promises;
const path = require("path");

// const tasdiqlash = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const post = Post.findById(id);
//     if (!post) {
//       return next(new ErrorResponse("post topilmadi", 404));
//     }
//     await Post.findByIdAndUpdate(
//       id,
//       { isPublished: true },
//       { new: true, runValidators: true }
//     );
//     res.status(200).json({
//       success: true,
//       message: "Tasdiqlandi",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select(
      "-password -resetPasswordExpire -resetPasswordToken"
    );
    if (!users) {
      return next(new ErrorResponse("Foydalanuvchilar mavjud emas", 404));
    }
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return next(new ErrorResponse("Foydalanuvchi topilmadi", 404));
    }

    if (user.image) {
      const userImagePath = path.join(__dirname, "../uploads", user.image);
      try {
        await fs.unlink(userImagePath);
        console.log(`Foydalanuvchi rasmi ochirildi: ${user.image}`);
      } catch (err) {
        console.error(
          `Foydalanuvchi rasmini ochirishda xato (${user.image}):`,
          err
        );
      }
    }
    // Foydalanuvchiga tegishli postlarni topish va rasmlarni o'chirish
    const userPosts = Post.find({ author: id });
    if (userPosts > 0) {
      const postIds = (await userPosts).map((post) => post._id);
      for (const post of userPosts) {
        if (post.image) {
          const imagePath = path.join(__dirname, "../uploads", post.image);
          try {
            await fs.unlink(imagePath);
          } catch (err) {
            console.error(`Rasmni o'chirishda xato (${post.image}):`, err);
          }
        }
      }
      //   userga tegishli postlarni o'chirish
      await Post.deleteMany({ author: id });
      await Comment.deleteMany({ post: { $in: postIds } }); // Faqat ushbu postlardagi kommentlar o'chiriladi
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Foydalanuvchi, postlar va rasmlar o'chirildi",
    });
  } catch (error) {
    next(error);
  }
};

const getAnalytics = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPosts = await Post.countDocuments();

    const popularPostsByViews = await Post.find()
      .sort({ views: -1 })
      .limit(5)
      .select("title views likes author image createdAt")
      .populate("author", "userName image");

    const popularPostsByLikes = await Post.find()
      .sort({ "likes.length": -1 })
      .limit(5)
      .select("title views likes author image createdAt")
      .populate("author", "userName image");

    return res.status(200).json({
      success: true,
      message: "Tizim analitikasi",
      analetika: {
        totalUsers,
        totalPosts,
        popularPostsByViews,
        popularPostsByLikes,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteUser, getUsers, getAnalytics };
