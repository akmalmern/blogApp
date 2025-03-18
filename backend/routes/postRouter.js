const express = require("express");
const { isAuthenticated } = require("../middlware/isAuth");
const {
  addPost,
  getPosts,
  updatePost,
  deletePost,
  getUserPosts,
} = require("../conteroller/postController");
const uploadMiddleware = require("../middlware/uploadMiddleware");
const router = express.Router();

router.post("/add-post", uploadMiddleware, isAuthenticated, addPost);
router.get("/posts", getPosts);
router.get("/my-posts", isAuthenticated, getUserPosts);
router.put("/update-post/:id", uploadMiddleware, isAuthenticated, updatePost);
router.delete("/delete/:id", isAuthenticated, deletePost);

module.exports = router;
