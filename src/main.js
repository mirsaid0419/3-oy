import { config } from "dotenv";
config();
import express from "express";
import configs from "./config/config.js";
import { connectDb } from "./db/connect.js";
import fileupload from "express-fileupload";
import router from "./routes/index.routes.js";

const app = express();
app.use(express.json());
app.use(fileupload());

await connectDb();

app.use("/api", router);

app.use((error, req, res, next) => {
  return res.status(error.status||500).json({status:error.status,message:error.message});
});
app.listen(configs.PORT, () =>
  console.log("server running on port ", +configs.PORT)
);
