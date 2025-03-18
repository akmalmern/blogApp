const express = require("express");
const { isAuthenticated } = require("../middlware/isAuth");
const {
  addPost,
  getPosts,
  updatePost,
  deletePost,
} = require("../conteroller/postController");
const uploadMiddleware = require("../middlware/uploadMiddleware");
const router = express.Router();

router.post("/add-post", uploadMiddleware, isAuthenticated, addPost);
router.get("/posts", getPosts);
router.put("/update-post/:id", uploadMiddleware, isAuthenticated, updatePost);
router.delete("/delete/:id", isAuthenticated, deletePost);

module.exports = router;
