import express from "express";
import config from "./config/config.js";
import router from "./routes/index.routes.js";
import pool from "./db/connect.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { appendFileSync } from "fs";
import {
  ValidationsError,
  ServerError,
  ConfliktError,
  NotFoundError,
} from "./utils/errors.js";
import { join } from "path";

const app = express();

app.use(express.json());
app.use(fileUpload());
app.use(cookieParser());

app.use("/api", router);

app.use((err, req, res, next) => {
  //   if (err instanceof ValidationsError) {
  //     return res.status(err.status).json({
  //       status: err?.status || 422,
  //       message: err?.message || "Validation err",
  //     });
  //   } else if (err instanceof ServerError) {
  //     return res.status(err.status).json({
  //       status: err?.status || 500,
  //       message: err?.message || "Internal server err",
  //     });
  //   } else if (err instanceof NotFoundError) {
  //     return res.status(err.status).json({
  //       status: err?.status || 404,
  //       message: err?.message || "Not found err",
  //     });
  //   } else if (err instanceof ConfliktError) {
  //     return res.status(err.status).json({
  //       status: err?.status || 409,
  //       message: err?.message || "Conflik err",
  //     });
  //   } else {
  //     return res.status(500).json({
  //       status: 500,
  //       message: err.message,
  //     });
  //   }
  if (!err.status || err.status >= 500) {
    const data = `${Date()} ${500} ${err}\n`;
    appendFileSync(join(process.cwd(), "src", "logs", "loger.txt"), data);
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
