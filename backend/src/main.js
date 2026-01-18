import express from "express";
import config from "./config/config.js";
import router from "./routes/index.routes.js";
import pool from "./db/connect.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import winston from "./utils/logger.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(cookieParser());

app.use("/api", router);



app.use((err, req, res, next) => {
  if (!err.status || err.status >= 500) {
    winston.error(err)
    return res.status(500).json({
      status: 500,
      message: "internal server error",
    });
  }
  return res.status(err.status).json({
    status: err.status,
    message: err.message || "internal server error",
  });
});

app.listen(config.PORT, () => console.log("server running"));
