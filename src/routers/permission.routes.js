import { Router } from "express";
import permissionController from "../controllers/permission.controller.js";
import checkToken from "../middlewares/checkToken.js";
import roleGuard from "../guards/role.guard.js";
import permissionGuard from "../guards/permission.guard.js";
import PermissionValidator from "../validations/permissionValidate.js";

const router = Router();

router
  .get(
    "/all",
    checkToken,
    roleGuard("SuperAdmin"),
    permissionGuard("Permissions", "create"),
    permissionController.getAll
  )
  .get(
    "/get/:id",
    checkToken,
    roleGuard("SuperAdmin"),
    permissionGuard("Permissions", "read"),
    permissionController.getById
  )
  .put(
    "/put/:id",
    checkToken,
    roleGuard("SuperAdmin"),
    permissionGuard("Permissions", "update"),
    permissionController.update
  )
  .delete(
    "/delete/:id",
    checkToken,
    roleGuard("SuperAdmin"),
    permissionGuard("Permissions", "delete"),
    permissionController.delete
  );

export default router;
