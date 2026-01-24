import { Router } from "express";
import Student from "../controllers/student.controller.js"
const router=Router()

router
    .post("/create",Student.createStudent)
    .get("/groups/:id",Student.getOneStudent)
    .get("/groups",Student.getAllStudent)
    .put("/group/:id",Student.updateStudent)
    .delete("/group/:id",Student.deleteStudent)

export default router