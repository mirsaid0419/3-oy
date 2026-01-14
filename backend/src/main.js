import express from "express";
import config from "./config/config.js";
import router from "./routes/index.routes.js";
import pool from "./db/connect.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { appendFileSync } from "fs";
import nodemailer from "nodemailer";
import cors from "cors"
import { join } from "path";

const app = express();
app.use(cors())
app.use(express.json());
app.use(fileUpload());
app.use(cookieParser());

app.use("/api", router);

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abduqulovmirsai0419@gmail.com",
    pass: "bogo zdlh ecfg wjtr",
  },
});

app.post("/send",async(req,res)=>{
  const {email}=req.body
  await transport.sendMail({
    from: `'MIB' <abduqulovmirsai@gmail.com>`,
    to: email,
    subject: "tasdiqlash kodi",
    html: `<h2>Jarima</h2>`,
  });
  return res.status(200).send("sms yuborildi")
})

app.use((err, req, res, next) => {
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
