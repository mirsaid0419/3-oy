import { Router } from "express";
import usersRouter from "./user.routes.js"
import filesRouter from "../routes/files.routes.js"
const router=Router()

router
  .use("/users",  usersRouter)
  .use("/files",  filesRouter);

export default router;
