import { Router } from "express";
import userMiddleware from "../middlewares/user.middleware.js";
import user from "../controllers/user.controller.js";
const router=Router()

router
  .post("/registr", userMiddleware.registr, user.registr)
  .post("/login", userMiddleware.logIn, user.logIn)
  .post("/refresh",user.refresh)
  .get("/users",user.getAllUsers)

export default router;
