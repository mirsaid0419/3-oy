import { Router } from "express";
import crud from "../controllers/main.controller.js"
import ordersMiddleware from "../middlewares/orders.middleware.js";
const ordersRouter=Router()

ordersRouter
    .post("/order",ordersMiddleware.post_put,crud.createOrder)
    .put("/order/:id",ordersMiddleware.post_put,crud.update)
    .get("/order/smart",crud.smartQuerry)
    .get("/order/:id",crud.getById)
    .get("/order",crud.orderGetAll)
    .delete("/order/:id",crud.delete)

export default ordersRouter