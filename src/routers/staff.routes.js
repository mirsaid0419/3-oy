import { Router } from "express";
import Staff from "../controllers/staff.controller.js";
import checkToken from "../middlewares/checkToken.js";
import roleGuard from "../guards/role.guard.js";
import permissionGuard from "../guards/permission.guard.js";
const router = Router();

router
  .post("/register", Staff.createStaff)
  .post("/otp", Staff.sendOtp)
  .post("/login", Staff.loginStaff)
  .get(
    "/get/:id",
    checkToken,
    roleGuard("SuperAdmin", "Admin", "Staff"),
    permissionGuard("Staff"),
    Staff.getById
  )
  .get("/all", checkToken, roleGuard("SuperAdmin", "Admin"), Staff.getAll)
  .put(
    "/put/admin/:id",
    checkToken,
    roleGuard("SuperAdmin", "Admin"),
    Staff.updateStaff
  )
  .put("/put",checkToken,Staff.updateStaff)
  .delete(
    "/delete/:id",
    checkToken,
    roleGuard("SuperAdmin", "Admin"),
    Staff.delete
  );

  export default router