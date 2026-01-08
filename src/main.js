import express from "express";
import config from "./config/config.js";
import router from "./routes/index.routes.js";
import pool from "./db/connect.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

const app = express();

app.use(express.json());
app.use(fileUpload())
app.use(cookieParser());

app.use("/api", router);

app.use();

app.listen(config.PORT, () => console.log("server running"));
