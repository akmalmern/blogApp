const userModel = require("../model/userModel");
const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
const fs = require("fs").promises; // Fayl tizimi bilan ishlash uchun
const path = require("path"); // Fayl yo‘llarini boshqarish uchun
const bcrypt = require("bcryptjs"); // Parolni hash qilish uchun
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const register = async (req, res, next) => {
  const { userName, email, password, role } = req.body;

  if (!userName || !email || !password) {
    return next(new ErrorResponse("Maydonni to'liq to'ldiring", 400));
  }

  if (password.length < 4) {
    return next(
      new ErrorResponse("Parol kamida 4 ta belgidan iborat bo'lishi kerak", 400)
    );
  }

  const image = req.file ? req.file.filename : null;

  try {
    const user = await userModel.create({
      userName,
      email,
      password,
      image,
      role,
    });

    const accessToken = user.jwtAccessToken();
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      // secure: false,
      sameSite: "strict",
      maxAge: 60 * 1000, // 1 soat
    });

    // 7. Refresh token yaratish va cookie ga joylash
    const refreshToken = user.jwtRefreshToken();
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      // secure: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 kun
    });

    // 8. Muvaffaqiyatli javob qaytarish
    res.status(201).json({
      success: true,
      message: "Ro'yxatdan o'tdingiz",
      accessToken,
      user: {
        userName: user.userName,
        email: user.email,
        role: user.role,
        image: user.image,
      },
    });
  } catch (error) {
    next(error);
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
      // secure: process.env.NODE_ENV === "production",
      // secure: false,
      sameSite: "strict",
      maxAge: 60 * 1000,
    });
    const refreshToken = user.jwtRefreshToken();
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      // secure: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Tzimga kirdingiz",
      accessToken,

      user,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { userName, password, newPassword } = req.body;
    const userId = req.user._id;

    // Foydalanuvchini olish (parol bilan)
    const user = await userModel.findById(userId).select("+password");
    if (!user) {
      return next(new ErrorResponse("Foydalanuvchi tizimga kirmagan", 401));
    }

    // Yangilangan ma'lumotlarni tayyorlash
    const updatedData = {
      userName: userName || user.userName,
    };

    // Parol tekshiruvi va yangilanishi (faqat newPassword bo‘lsa)
    if (newPassword) {
      if (!password) {
        return next(new ErrorResponse("Eski parolni kiritish majburiy", 401));
      }
      const isMatch = await user.parolniTekshirish(password);
      if (!isMatch) {
        return next(new ErrorResponse("Eski parol noto‘g‘ri", 401));
      }
      if (newPassword.length < 4) {
        return next(
          new ErrorResponse(
            "Yangi parol kamida 4 belgidan iborat bo‘lishi kerak",
            400
          )
        );
      }
      // Parolni qo‘lda hash qilish
      const salt = await bcrypt.genSalt(10);
      updatedData.password = await bcrypt.hash(newPassword, salt);
    }

    // Rasm o‘zgartirish logikasi
    if (req.file) {
      if (user.image) {
        const oldImagePath = path.join(__dirname, "../uploads", user.image);
        try {
          await fs.unlink(oldImagePath);
        } catch (err) {
          console.error("Eski rasmni o‘chirishda xato:", err.message);
        }
      }
      updatedData.image = req.file.filename;
    }

    // Foydalanuvchi ma'lumotlarini yangilash
    const updatedUser = await userModel
      .findByIdAndUpdate(userId, updatedData, {
        new: true, // Yangilangan ma'lumotni qaytaradi
        runValidators: true, // Schema validatsiyalarini ishga tushiradi
      })
      .select("-password");

    res.status(200).json({
      success: true,
      message: "Foydalanuvchi ma'lumotlari muvaffaqiyatli yangilandi",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

const userProfile = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user, // req user da bazaga qayta murojat qilish shart emas malumotlar IsAuthenticateddan ceshlanib keladi
    });
  } catch (error) {
    next(error);
  }
};

const logOut = (req, res, next) => {
  try {
    // Refresh tokenni cookie'dan olib tashlash
    res.clearCookie("refreshToken", {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      // secure: false,
      sameSite: "Strict",
    });
    res.clearCookie("accessToken", {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      secure: false,
      sameSite: "Strict",
    });

    res.status(200).json({
      success: true,
      message: "Tizimdan muvaffaqiyatli chiqdingiz",
    });
  } catch (error) {
    next(error);
  }
};

const refreshAccessToken = async (req, res, next) => {
  try {
    // Cookie’dan refreshToken ni olish
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token topilmadi",
      });
    }

    // Refresh tokenni tekshirish
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Refresh token noto‘g‘ri yoki muddati tugagan",
      });
    }

    // Foydalanuvchini topish
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Foydalanuvchi topilmadi",
      });
    }

    // Yangi accessToken va refreshToken yaratish
    const newAccessToken = user.jwtAccessToken();
    const newRefreshToken = user.jwtRefreshToken();

    // Cookie’ga yangi tokenlarni joylashtirish
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      secure: false,
      sameSite: "strict",
      maxAge: 60 * 1000, // 1 soat
    });
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      secure: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 kun
    });

    // Muvaffaqiyatli javob qaytarish
    res.status(200).json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error("Refresh token endpoint xatosi:", error);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: " + error.message,
    });
  }
};

// Route

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // .env faylda saqlang
    pass: process.env.EMAIL_PASS, // Gmail uchun App Password
  },
});

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return next(new ErrorResponse("Email kiritish majburiy", 400));

    const user = await userModel.findOne({ email });
    if (!user)
      return next(
        new ErrorResponse("Bu email bilan foydalanuvchi topilmadi", 404)
      );

    // 6 raqamli tasodifiy kod generatsiyasi
    const resetToken = crypto.randomInt(100000, 1000000).toString();
    const resetTokenExpire = Date.now() + 3 * 60 * 1000;

    await userModel.updateOne(
      { _id: user._id },
      {
        resetPasswordToken: resetToken,
        resetPasswordExpire: resetTokenExpire,
      }
    );

    const message = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Parolni tiklash kodi",
      html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h4>Parolni tiklash</h4>
        <p>Sizning parolni tiklash kodingiz: <strong>${resetToken}</strong></p>
        <p>Kod 3 daqiqa amal qiladi.</p>
       
      </div>
    `,
    };
    await transporter.sendMail(message);

    res.status(200).json({
      success: true,
      message: "Tasdiqlash kodi emailingizga yuborildi",
    });
  } catch (error) {
    console.error("Email yuborishda xato:", error.stack);
    return next(new ErrorResponse("Email yuborishda xatolik yuz berdi", 500));
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { resetToken, newPassword } = req.body;

    // Majburiy maydonlarni tekshirish
    if (!resetToken || !newPassword) {
      return next(
        new ErrorResponse(" kod va yangi parol kiritish majburiy", 400)
      );
    }

    // Foydalanuvchini topish va tokenni tekshirish
    const user = await userModel.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpire: { $gt: Date.now() }, // Kod hali amalda
    });

    if (!user) {
      return next(
        new ErrorResponse("Noto‘g‘ri kod yoki kodning muddati tugagan", 400)
      );
    }

    user.password = newPassword;
    user.resetPasswordToken = null; // Kodni o‘chirish
    user.resetPasswordExpire = null; // Muddatni o‘chirish
    await user.save();

    res.status(200).json({
      success: true,
      message: "Parol muvaffaqiyatli yangilandi",
    });
  } catch (error) {
    console.error("Parolni tiklashda xato:", error.stack);
    return next(new ErrorResponse("Parolni tiklashda xatolik yuz berdi", 500));
  }
};

module.exports = {
  register,
  login,
  userProfile,
  logOut,
  refreshAccessToken,

  updateUser,
  forgotPassword,
  resetPassword,
};
