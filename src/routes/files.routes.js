import { Router } from "express";
import userMiddleware from "../middlewares/user.middleware.js";
import files from "../controllers/files.controller.js"
const router=Router()

router
  .post("/save", userMiddleware.files, files.savedFile)
//   .get("/files", userMiddleware.files, files.getAllFiles);

export default router;
