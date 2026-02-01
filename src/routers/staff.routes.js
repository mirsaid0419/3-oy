import { Router } from "express";
import Staff from "../controllers/staff.controller.js";
import checkToken from "../middlewares/checkToken.js";
import roleGuard from "../guards/role.guard.js";
import permissionGuard from "../guards/permission.guard.js";
import { checkById } from "../middlewares/checkById.js";
const router = Router();

router
  .post("/register", Staff.createStaff)
  .post("/otp", Staff.sendOtp)
  .post("/login", Staff.loginStaff)
  .get(
    "/get/:id",
    checkToken,
    roleGuard("SuperAdmin", "Admin", "Staff"),
    checkById("Staffs"),
    Staff.getById
  )
  .get(
    "/all",
    checkToken,
    roleGuard("SuperAdmin"),
    permissionGuard("Staffs", "read"),
    Staff.getAll
  )
  .put(
    "/put/admin/:id",
    checkToken,
    roleGuard("SuperAdmin", "Admin"),
    permissionGuard("Staffs","update"),
    Staff.updateAdminStaff
  )
  .put("/put", checkToken ,Staff.updateStaff)
  .delete(
    "/delete/:id",
    checkToken,
    roleGuard("SuperAdmin", "Admin"),
    permissionGuard("Staffs", "delete"),
    Staff.delete
  );

export default router;
