import express from "express";
import config from "./config/config.js";
import router from "./routers/users.routes.js";
import pool from "./db/connect.js";
import error from "./helpers/error.returning.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api", router);


app.use(error);
app.listen(config.port, () => console.log("server running"));
