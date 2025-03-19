const ErrorResponse = require("../utils/errorResponse");
const Category = require("../model/cetegoryModel");

const addCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return next(
        new ErrorResponse("category nomini kiritishingiz shart", 400)
      );
    }

    const category = await Category.create({ name, description });
    res.status(201).json({
      success: true,
      message: "category qo'shildi",
      category,
    });
  } catch (error) {
    next(error);
  }
};

const getCategory = async (req, res, next) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return next(new ErrorResponse("Categoriyalar topilmadi", 404));
    }
    res.status(200).json({
      success: true,
      message: "Categoriyalar",
      categories,
    });
  } catch (error) {
    next(error);
  }
};

const deletCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(new ErrorResponse("Kategoriya ID kiritilmadi", 400));
    }

    const delCat = await Category.findByIdAndDelete(id);
    if (!delCat) {
      return next(
        new ErrorResponse("Bunday ID bilan kategoriya topilmadi", 404)
      );
    }

    res.status(200).json({
      success: true,
      message: "Kategoriya o'chirildi",
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const { id } = req.params;
    const cat = await Category.findById(id);
    if (!cat) {
      return next(new ErrorResponse("Kategoriya ID topilmadi", 404));
    }
    // Yangilangan post ma’lumotlari
    const newCat = {
      name: name?.trim() || cat.title,
      description: description?.trim() || cat.description,
    };
    const editCat = await Category.findByIdAndUpdate(id, newCat, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "category o'zgartirildi",
      category: editCat,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { addCategory, getCategory, deletCategory, updateCategory };
