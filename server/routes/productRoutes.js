import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProductById,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/products").get(getProducts).post(createProduct);

router
  .route("/products/:productId")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

export default router;
