import jwt from "jsonwebtoken";
import config from "../config/config.js";
export default (io) => {
  const chatKanal = io.of("/chat");
  chatKanal.use((socket, next) => {
    const { token } = socket.handshake.auth;
    try {
      const user = jwt.verify(token, config.TOKEN.ACCESS_TOKEN_KEY);
      socket.user_id = user.id;
      next();
    } catch (error) {
      next(error);
    }
  });

  chatKanal.on("connection", (socket) => {
    socket.on("join_room", (id) => {
      socket.rooms.forEach((room) => {
        if (room !== socket.id) socket.leave(room);
      });
      const room_name = `room_${[socket.user_id, id].sort().join("_")}`;
      socket.join(room_name);
    });

    socket.on("send_msg", (data) => {
      const room_name = `room_${[String(socket.user_id), String(data.id)].sort().join("_")}`;
      socket.to(room_name).emit("receive_msg", {
        from_id: socket.user_id,
        message: data.message,
        file_name:data?.file_name ,
        file_type:data?.file_type 
      });
    });
  });
};
