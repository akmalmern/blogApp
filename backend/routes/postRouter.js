const express = require("express");
const { isAuthenticated } = require("../middlware/isAuth");
const { addPost, getPosts } = require("../conteroller/postController");
const uploadMiddleware = require("../middlware/uploadMiddleware");
const router = express.Router();

router.post("/add-post", uploadMiddleware, isAuthenticated, addPost);
router.get("/posts", getPosts);

module.exports = router;
