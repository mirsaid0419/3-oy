import { Router } from "express";
import userRouter from "./users.routes.js"
import studentRouter from "./students.routes.js"
import courseRouter from "../routes/course.routes.js"
import groupRouter from "../routes/groups.routes.js"
const router = Router();

router
  .use("/user", userRouter)
  .use("/student", studentRouter)
  .use("/course",courseRouter)
  .use("/group",groupRouter);

  export default router