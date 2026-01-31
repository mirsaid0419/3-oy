import { Router } from "express";
import staffRouter from "./staff.routes.js";
import branchRouter from "./branch.routes.js";
import transportRouter from "./transport.routes.js";
import permissionRouter from "./permission.routes.js"

const router = Router();

router
  .use("/staff", staffRouter)
  .use("/branch", branchRouter)
  .use("/transport", transportRouter)
  .use("/permission", permissionRouter)
export default router