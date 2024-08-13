import db from "../config/db/db_conn.js";
import { MESSAGES } from "../constants/messages.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await db("users").select("*").where({ is_deleted: false });
    res
      .status(201)
      .json({ message: MESSAGES.USERS_FETCH_SUCCESS, response: users });
  } catch (error) {
    res
      .status(500)
      .json({ message: MESSAGES.ERROR_OCCURRED, error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await db("users")
      .select("*")
      .where({ id: userId, is_deleted: false })
      .first();
    if (user) {
      res.status(201).json({
        message: MESSAGES.USER_FETCH_SUCCESS,
        response: user,
      });
    } else {
      res.status(404).json({ message: MESSAGES.USER_NOT_FOUND });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: MESSAGES.ERROR_OCCURRED, error: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = req.body;
    const [userId] = await db("users").insert(user);
    res
      .status(201)
      .json({ message: MESSAGES.USER_CREATE_SUCCESS, response: userId });
  } catch (error) {
    res
      .status(500)
      .json({ message: MESSAGES.ERROR_OCCURRED, error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUser = { ...req.body, updated_at: new Date() };
    const user = await db("users").select("*").where({ id: userId }).first();
    if (user) {
      await db("users")
        .where({ id: userId, is_deleted: false })
        .update(updatedUser);
      res.status(201).json({ message: MESSAGES.USER_UPDATE_SUCCESS });
    } else {
      res.status(404).json({ message: MESSAGES.USER_NOT_FOUND });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: MESSAGES.ERROR_OCCURRED, error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedUser = { is_deleted: true, updated_at: new Date() };
    await db("users").select("*").where({ id: userId }).update(deletedUser);
    res.status(201).json({ message: MESSAGES.USER_DELETE_SUCCESS });
  } catch (error) {
    res
      .status(500)
      .json({ message: MESSAGES.ERROR_OCCURRED, error: error.message });
  }
};
