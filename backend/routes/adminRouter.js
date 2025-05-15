const express = require("express");
const { isAuthenticated, isAdmin } = require("../middlware/isAuth");
const {
  // tasdiqlash,
  getUsers,
  deleteUser,
  getAnalytics,
} = require("../conteroller/adminController");
const router = express.Router();

// router.put("/tasdiqlash/:id", isAuthenticated, isAdmin, tasdiqlash);
router.get("/users", isAuthenticated, isAdmin, getUsers);
router.delete("/delete-user/:id", isAuthenticated, isAdmin, deleteUser);
router.get("/analetika", isAuthenticated, isAdmin, getAnalytics);

module.exports = router;
