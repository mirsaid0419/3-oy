import express from "express";
import config from "./config/config.js";
import router from "./routes/index.routes.js";
import pool from "./db/connect.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import errorHendl from "./utils/errorHendl.js";
import { Server } from "socket.io";
import { createServer } from "http";
import socket from "./routes/socket.routes.js";
const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(cookieParser());

app.use("/api", router);

socket(io);

app.use(errorHendl);

server.listen(config.PORT, () => console.log("server running"));
