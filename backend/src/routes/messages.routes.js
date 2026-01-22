import { Router } from "express";
import checkToken from "../middlewares/checkToken.js";
import messages from "../controllers/messages.controller.js";
const router = Router()

router
    .get("/messages/:to_id",checkToken,messages.getMessages)
    .post("/create/:to_id",checkToken,messages.createMessages)

export default router