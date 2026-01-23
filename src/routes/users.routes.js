import { Router } from "express";
import User from "../controllers/user.controller.js"
const router=Router()

router
    .post("/create",User.createUser)
    .get("/user/:id",User.getOneUser)
    // .get("/users",getAllUsers)
    // .put("/user:id",updateUser)
    // .delete("user:id",deleteUser)

export default router