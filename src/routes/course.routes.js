import { Router } from "express";
import Course from "../controllers/course.controller.js"
const router=Router()

router
    .post("/create",Course.createCourse)
    .get("/course/:id",Course.getOneCourse)
    .get("/courses",Course.getAllCourse)
    .put("/course/:id",Course.updateCourse)
    .delete("/course/:id",Course.deleteCourse)

export default router