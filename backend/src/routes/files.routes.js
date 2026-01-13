import { Router } from "express";
import userMiddleware from "../middlewares/user.middleware.js";
import files from "../controllers/files.controller.js";
import checkToken from "../middlewares/checkToken.js";
const router = Router();

router
  .post("/save", userMiddleware.files, files.savedFile)
  .get("/", files.getAllVideos)
  .get("/files/:file_name",files.getVideo)
  .get("/files", checkToken, files.getOneUserVideos)
  .put("/files/:file_id",checkToken,userMiddleware.fileUpdate,files.updateVideo)
  .delete("/files/:file_id",checkToken,files.deleteVideo)

export default router;
