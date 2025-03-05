const userModel = require("../model/userModel");
const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
const register = async (req, res, next) => {
  const { userName, email, password, role } = req.body;

  const existUser = await userModel.findOne({ email });
  if (existUser) {
    return next(new ErrorResponse("Bu fofdalanuvchi tizimda mavjud", 409));
  }

  if (!userName || !email || !password) {
    return next(new ErrorResponse("Maydonni to'liq to'ldiring", 400));
  }

  if (password.length < 4) {
    return next(
      new ErrorResponse(
        "Paro'l kamida 4 ta belgidan iborat bo'lishi kerak",
        400
      )
    );
  }

  try {
    const user = await userModel.create({
      userName,
      email,
      password,
      role,
    });

    const accessToken = user.jwtAccessToken();
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 1000,
    });

    const refreshToken = user.jwtRefreshToken();
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 120 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "Ro'yxatdan o'tdingiz",
      accessToken,
      user,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errorMessages = Object.values(error.errors).map(
        (val) => val.message
      );
      next(new ErrorResponse(errorMessages[0], 500));
    } else {
      next(error.message);
    }
  }
};

const login = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    if (!password || !email) {
      return next(new ErrorResponse("Maydonni to'liq to'ldiring", 400));
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return next(
        new ErrorResponse("Bu foydalanuvchi tizimda mavjud emas", 404)
      );
    }

    // paro'lni tekshirish
    const isMatch = await user.parolniTekshirish(password);
    if (!isMatch) {
      return next(new ErrorResponse("Paro'l xato", 400));
    }
    // accessToken
    const accessToken = await user.jwtAccessToken();
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 1000,
    });
    const refreshToken = user.jwtRefreshToken();
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 120 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Tzimga kirdingiz",
      accessToken,
      refreshToken,
      user,
    });
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

const userProfile = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    if (!user) {
      return next(new ErrorResponse("Foydalanuvchi topilmadi", 404));
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

const refreshAccessToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return next(new ErrorResponse("Yaroqsiz yoki muddati o'tgan token", 403));
    }
    // rerfresh tokenni tekshirish
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);

    const user = await userModel.findById(decoded.id);
    if (!user) {
      return next(new ErrorResponse("Foydalanuvchi topilmadi", 404));
    }
    // yangi access token yaratish;
    const newAccessToken = user.jwtAccessToken();
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 1000,
    });

    res.status(200).json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

module.exports = { register, login, userProfile, refreshAccessToken };
