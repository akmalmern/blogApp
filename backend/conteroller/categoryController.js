const ErrorResponse = require("../utils/errorResponse");
const categoryModel = require("../model/cetegoryModel");

const addCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return next(
        new ErrorResponse("category nomini kiritishingiz shart", 400)
      );
    }

    const category = await categoryModel.create({ name, description });
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
    const categories = await categoryModel.find();
    if (!categories) {
      return next(new ErrorResponse("Categoriyalar topilmadi", 404));
    }
    res.status(200).json({
      success: true,
      message: "Categoriyalar",
      categories,
    });
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

const deletCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(new ErrorResponse("Kategoriya ID kiritilmadi", 400));
    }

    const delCat = await categoryModel.findByIdAndDelete(id);
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
    next(new ErrorResponse(error.message, 500));
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const { id } = req.params;
    if (!id) {
      return next(new ErrorResponse("Kategoriya ID kiritilmadi", 400));
    }

    const editCat = await categoryModel.findByIdAndUpdate(
      id,
      {
        name,
        description,
      },
      { new: true }
    );
    // Agar kategoriya topilmasa
    if (!editCat) {
      return next(
        new ErrorResponse("Bunday ID bilan kategoriya topilmadi", 404)
      );
    }
    res.status(200).json({
      success: true,
      message: "category o'zgartirildi",
      category: editCat,
    });
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

module.exports = { addCategory, getCategory, deletCategory, updateCategory };
