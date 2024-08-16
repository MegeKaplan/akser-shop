import express from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  getUserById,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/users").get(getUsers).post(createUser);

router
  .route("/users/:userId")
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

export default router;
