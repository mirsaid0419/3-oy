import { Router } from "express";
import Transport from "../controllers/transport.controller.js";
import checkToken from "../middlewares/checkToken.js";
import roleGuard from "../guards/role.guard.js";
import permissionGuard from "../guards/permission.guard.js";
const router = Router();

export default router
  .post(
    "/create",
    checkToken,
    roleGuard("SuperAdmin", "Admin"),
    permissionGuard("Transports", "create"),
    Transport.create
  )
  .get(
    "/get/:id",
    checkToken,
    roleGuard("SuperAdmin", "Admin", "Staff"),
    permissionGuard("Transports", "read"),
    Transport.getById
  )
  .get(
    "/all",
    checkToken,
    roleGuard("SuperAdmin", "Admin", "Staff"),
    permissionGuard("Transports", "read"),
    Transport.getAll
  )
  .put(
    "/put/:id",
    checkToken,
    roleGuard("SuperAdmin", "Admin"),
    permissionGuard("Transports", "update"),
    Transport.update
  )
  .delete(
    "/delete/:id",
    checkToken,
    roleGuard("SuperAdmin", "Admin"),
    permissionGuard("Transports", "delete"),
    Transport.delete
  );
