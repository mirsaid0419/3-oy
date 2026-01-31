import { Router } from "express";
import Branch from "../controllers/branch.controller.js";
import checkToken from "../middlewares/checkToken.js";
import roleGuard from "../guards/role.guard.js";
import permissionGuard from "../guards/permission.guard.js";
const router = Router();

router
  .post(
    "/create",
    checkToken,
    roleGuard("SuperAdmin"),
    permissionGuard("Branches", "create"),
    Branch.create
  )
  .get(
    "/get/:id",
    checkToken,
    roleGuard("SuperAdmin", "Admin"),
    permissionGuard("Branches", "read"),
    Branch.getById
  )
  .get(
    "/all",
    checkToken,
    roleGuard("SuperAdmin", "Admin"),
    permissionGuard("Branches", "read"),
    Branch.getAll
  )
  .put(
    "/put/:id",
    checkToken,
    roleGuard("SuperAdmin"),
    permissionGuard("Branches", "update"),
    Branch.update
  )
  .delete(
    "/delete/:id",
    checkToken,
    roleGuard("SuperAdmin"),
    permissionGuard("Branches", "delete"),
    Branch.delete
  );

  export default router