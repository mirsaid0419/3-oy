import { Router } from "express";
import crud from "../controllers/main.controller.js"
import carsMiddleware from "../middlewares/cars.middleware.js";
const carsRouter=Router()

carsRouter
    .post("/car",carsMiddleware.post_put,crud.create)
    .put("/car/:id",carsMiddleware.post_put,crud.update)
    .get("/car/:id",crud.getById)
    .get("/car",crud.getAll)
    .delete("/car/:id",crud.delete)

export default carsRouter