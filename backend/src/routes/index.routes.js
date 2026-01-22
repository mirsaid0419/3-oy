import { Router } from "express";
import usersRouter from "./user.routes.js"
import filesRouter from "../routes/files.routes.js"
import messagesRouter from "./messages.routes.js";
const router=Router()

router
  .use("/users",  usersRouter)
  .use("/files",  filesRouter)
  .use("/messages",messagesRouter)
export default router;
