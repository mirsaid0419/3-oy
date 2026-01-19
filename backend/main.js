import cors from "cors";
import express from "express";
import { createServer } from "http";
import { join } from "path";
import { Server } from "socket.io";

const app = express();
app.use(cors());
const server = createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(express.static(join(process.cwd(), "css")));

io.on("connection", (socket) => {
  socket.on("sms", (data) => {
    socket.broadcast.emit("javob", data);
  });
});

server.listen(3000, () => console.log("backend server ishladi"));
