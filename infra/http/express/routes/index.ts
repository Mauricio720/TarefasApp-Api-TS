import { Router } from "express";
import UserRouter from "./UserRoutes";

const router = Router();

router.use("/users", UserRouter);

export default router;