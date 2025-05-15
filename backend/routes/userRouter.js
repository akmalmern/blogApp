const express = require("express");
const {
  register,
  login,
  userProfile,
  refreshAccessToken,

  updateUser,
  forgotPassword,
  resetPassword,
  logOut,
} = require("../conteroller/userController");
const { isAuthenticated, isAdmin } = require("../middlware/isAuth");
const router = express.Router();
const uploadMiddleware = require("../middlware/uploadMiddleware");

router.post("/register", uploadMiddleware, register);
router.post("/login", login);
router.get("/profile", isAuthenticated, userProfile);
router.get("/logout", logOut);
router.post("/refresh-token", refreshAccessToken);
router.put("/update-user", isAuthenticated, uploadMiddleware, updateUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
