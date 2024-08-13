import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import db from "./config/db/db_conn.js";
import userRoutes from "./routes/userRoutes.js";

const config = dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running..." });
});

app.listen(PORT, () => {
  console.log(`Server is running...`);
});