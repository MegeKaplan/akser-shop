import express from "express";
import { uploadFile } from "../controllers/uploadController.js";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const fileLimit = 10;

router.post("/upload", upload.array("files", fileLimit), uploadFile);

export default router;
