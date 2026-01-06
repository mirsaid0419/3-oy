import { Router } from "express";
import crud from "../controllers/main.controller.js";
import paymentsMiddleware from "../middlewares/payments.middleware.js";

const paymentsRouter=Router()

paymentsRouter
    .post("/payment",paymentsMiddleware.post,crud.create)
    .get("/payment",crud.getAll)

export default paymentsRouter