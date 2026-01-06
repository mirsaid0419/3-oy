import { Router } from "express";
import crud from "../controllers/main.controller.js"
import customerMiddleware from "../middlewares/customer.middleware.js";
const customerRouter=Router()

customerRouter
    .post("/customer",customerMiddleware.post_put,crud.create)
    .put("/customer/:id",customerMiddleware.post_put,crud.update)
    .get("/customer/:id",crud.getById)
    .get("/customer",crud.getAll)
    .delete("/customer/:id",crud.delete)

export default customerRouter