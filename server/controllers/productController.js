import db from "../config/db/db_conn.js";
import { MESSAGES } from "../constants/messages.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await db("products")
      .select("*")
      .where({ is_deleted: false });
    res
      .status(201)
      .json({ message: MESSAGES.PRODUCTS_FETCH_SUCCESS, response: products });
  } catch (error) {
    res
      .status(500)
      .json({ message: MESSAGES.ERROR_OCCURRED, error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await db("products")
      .select("*")
      .where({ id: productId, is_deleted: false })
      .first();
    if (product) {
      res.status(201).json({
        message: MESSAGES.PRODUCT_FETCH_SUCCESS,
        response: product,
      });
    } else {
      res.status(404).json({ message: MESSAGES.PRODUCT_NOT_FOUND });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: MESSAGES.ERROR_OCCURRED, error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = {
      ...req.body,
      image_urls: JSON.stringify(req.body.image_urls),
    };
    const [productId] = await db("products").insert(product);
    res
      .status(201)
      .json({ message: MESSAGES.PRODUCT_CREATE_SUCCESS, response: productId });
  } catch (error) {
    res
      .status(500)
      .json({ message: MESSAGES.ERROR_OCCURRED, error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const updatedProduct = { ...req.body };
    const product = await db("products")
      .select("*")
      .where({ id: productId })
      .first();
    if (product) {
      await db("products")
        .where({ id: productId, is_deleted: false })
        .update(updatedProduct);
      res.status(201).json({ message: MESSAGES.PRODUCT_UPDATE_SUCCESS });
    } else {
      res.status(404).json({ message: MESSAGES.PRODUCT_NOT_FOUND });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: MESSAGES.ERROR_OCCURRED, error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = { is_deleted: true };
    await db("products")
      .select("*")
      .where({ id: productId })
      .update(deletedProduct);
    res.status(201).json({ message: MESSAGES.PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    res
      .status(500)
      .json({ message: MESSAGES.ERROR_OCCURRED, error: error.message });
  }
};
