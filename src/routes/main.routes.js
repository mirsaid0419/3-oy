import { Router } from "express";
import usersRouter from "./customer.routes.js"
import carsRouter from "./cars.routes.js"
import ordersRouter from "./orders.routes.js"
import paymentsRouter from "./payments.routes.js"
const router = Router()

router
    .use("/customers",usersRouter)
    .use("/cars",carsRouter)
    .use("/orders",ordersRouter)
    .use("/payments",paymentsRouter)

export default router