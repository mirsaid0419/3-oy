import { config } from "dotenv";
config();
import express from "express";
import configs from "./config/config.js";
import { connectDb } from "./db/connect.js";
import fileupload from "express-fileupload";
import router from "./routers/index.routes.js";
import errorHendl from "./utils/errorHendl.js";

const app = express();
app.use(express.json());
app.use(fileupload());

await connectDb();

app.use("/api", router);

app.use(errorHendl);
app.listen(configs.PORT, () =>
  console.log("server running on port ", +configs.PORT)
);
