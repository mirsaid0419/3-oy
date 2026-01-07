import { Router } from "express";
import user from "../controllers/user.controller.js"
import userMiddleware from "../middlewares/user.middleware.js";
const router = Router()

router
    .use("/registr",userMiddleware.registr,user.registr,)
    .use("/signin",userMiddleware.signIn,user.signIn)

export default router