const express = require("express");
const {
  addComment,
  updateComment,
  deleteComment,
} = require("../conteroller/commentController");
const { isAuthenticated } = require("../middlware/isAuth");
const router = express.Router();

router.put("/add-comment/:id", isAuthenticated, addComment);
router.put("/update/:id", isAuthenticated, updateComment);
router.delete("/delete/:id", isAuthenticated, deleteComment);

module.exports = router;
