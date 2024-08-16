import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.route("/categories").get(getAllCategories).post(createCategory);

router
  .route("/categories/:categoryId")
  .get(getCategoryById)
  .put(updateCategory)
  .delete(deleteCategory);

export default router;
