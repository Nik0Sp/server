import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import mongoConnect from "./src/configs/mongo.config.js";

const app = express();

// Constants
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// configs
mongoConnect();

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
