import { Router } from "express";
import Group from "../controllers/groups.controller.js"
const router=Router()

router
    .post("/create",Group.createGroup)
    .get("/group/:id",Group.getOneGroup)
    .get("/groups",Group.getAllGroup)
    .put("/group/:id",Group.updateGroup)
    .put("/addedstudent/:id",Group.addedStudent)
    .delete("/group/:id",Group.deleteGroup)

export default router