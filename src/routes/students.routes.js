import { Router } from "express";
import Student from "../controllers/student.controller.js"
const router=Router()

router
    .post("/create",Student.createStudent)
    .get("/student/:id",Student.getOneStudent)
    .get("/students",Student.getAllStudent)
    .put("/student/:id",Student.updateStudent)
    .delete("/student/:id",Student.deleteStudent)

export default router