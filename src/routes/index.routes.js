import { Router } from "express";
import usersRouter from "./user.routes.js"
const router=Router()

router
  .use("/users",  usersRouter)
//   .use("/files",  filesRouter);

export default router;
