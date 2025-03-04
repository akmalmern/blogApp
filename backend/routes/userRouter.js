const express = require("express");
const {
  register,
  login,
  userProfile,
} = require("../conteroller/userController");
const { isAuthenticated } = require("../middlware/isAuth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", isAuthenticated, userProfile);

module.exports = router;
