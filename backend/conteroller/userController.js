const userModel = require("../model/userModel");

const register = async (req, res, next) => {
  const { userName, email, password } = req.body;

  const existUser = await userModel.findOne({ email });
  if (existUser) {
    return res.status(404).json({
      success: false,
      message: "Bu fofdalanuvchi tizimda mavjud.",
    });
  }

  if (!userName || !email || !password) {
    return res.status(401).json({
      success: false,
      message: "Maydonni to'liq to'ldiring",
    });
  }

  if (password.length < 4) {
    return res.status(401).json({
      success: false,
      message: "Paro'l kamida 4 ta belgidan iborat bo'lishi kerak",
    });
  }

  try {
    const user = await userModel.create({
      userName,
      email,
      password,
    });
    res.status(201).json({
      success: true,
      message: "Ro'yxatdan o'tdingiz",
      user,
    });
  } catch (error) {
    console.log(error.message || "registerda xatolik");
  }
};

module.exports = { register };
