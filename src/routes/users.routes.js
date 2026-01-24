import { Router } from "express";
import User from "../controllers/user.controller.js"
const router=Router()

router
    .post("/create",User.createUser)
    .get("/user/:id",User.getOneUser)
    .get("/users",User.getAllUsers)
    .put("/user/:id",User.updateUser)
    .delete("/user/:id",User.deleteUser)

export default router