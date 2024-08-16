import db from "../config/db/db_conn.js";
import { MESSAGES } from "../constants/messages.js";

export const getCategories = async (req, res) => {
  const query = req.query;
  try {
    const categories = await db("categories")
      .select("*")
      .where({ is_deleted: false, ...query });
    res.status(201).json({
      message: MESSAGES.CATEGORIES_FETCH_SUCCESS,
      response: categories,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: MESSAGES.ERROR_OCCURRED, error: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await db("categories")
      .select("*")
      .where({ id: categoryId, is_deleted: false })
      .first();
    if (category) {
      res.status(201).json({
        message: MESSAGES.CATEGORY_FETCH_SUCCESS,
        response: category,
      });
    } else {
      res.status(404).json({ message: MESSAGES.CATEGORY_NOT_FOUND });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: MESSAGES.ERROR_OCCURRED, error: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const category = req.body;
    const [categoryId] = await db("categories").insert(category);
    res.status(201).json({
      message: MESSAGES.CATEGORY_CREATE_SUCCESS,
      response: categoryId,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: MESSAGES.ERROR_OCCURRED, error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const updatedCategory = { ...req.body };
    const category = await db("categories")
      .select("*")
      .where({ id: categoryId })
      .first();
    if (category) {
      await db("categories")
        .where({ id: categoryId, is_deleted: false })
        .update(updatedCategory);
      res.status(201).json({ message: MESSAGES.CATEGORY_UPDATE_SUCCESS });
    } else {
      res.status(404).json({ message: MESSAGES.CATEGORY_NOT_FOUND });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: MESSAGES.ERROR_OCCURRED, error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const deletedCategory = { is_deleted: true };
    await db("categories")
      .select("*")
      .where({ id: categoryId })
      .update(deletedCategory);
    res.status(201).json({ message: MESSAGES.CATEGORY_DELETE_SUCCESS });
  } catch (error) {
    res
      .status(500)
      .json({ message: MESSAGES.ERROR_OCCURRED, error: error.message });
  }
};
