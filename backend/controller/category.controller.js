import { response } from "express";
import categoryModel from "../schemas/category.schema.js";

const createCategory = async (req, res) => {
  try {
    const addCategory = await categoryModel.create(req.body);
    res.status(200).send({ response: addCategory });
  } catch (error) {
    res.status(404).send({ response: error });
  }
};

const getCategories = async (req, res) => {
  try {
    const getAllCategories = await categoryModel.find();
    res.status(200).send({ response: getAllCategories });
  } catch (error) {
    res.status(404).send({ response: error });
  }
};

const editCategory = async (req, res) => {
  const { id } = req.body;

  try {
    const editCategory = await categoryModel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).send({ response: editCategory });
  } catch (error) {
    res.status(404).send({ response: error });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.body;

  try {
    const deleteCategory = await categoryModel.findOneAndDelete({ _id: id });
    res.status(200).send({ response: deleteCategory });
  } catch (error) {
    res.status(404).send({ response: error });
  }
};

const searchCategory = async (req, res) => {
  const searchParam = req.params.key;

  const searchData = await categoryModel.find({
    $or: [{ name: { $regex: searchParam } }],
  });
  res.send({ response: searchData });
};

export default {
  createCategory,
  getCategories,
  editCategory,
  deleteCategory,
  searchCategory,
};
