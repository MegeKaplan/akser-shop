import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import knex from "knex";
import knexConfig from "./config/db/knexfile.js";

const config = dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running..." });
});

const db = knex(knexConfig.development);

const getAdmins = async () => {
  try {
    const admins = await db("users").select("*").where({ is_admin: true });
    console.log(admins);
  } catch (error) {
    console.error("Error retrieving admins:", error);
  } finally {
    db.destroy();
  }
};

getAdmins();

app.listen(PORT, () => {
  console.log(`Server is running...`);
});