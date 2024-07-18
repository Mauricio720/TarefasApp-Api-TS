import { Router } from "express";
import UserRouter from "./UserRoutes";
import TaskRouter from "./TaskRoutes";

const router = Router();

router.use("/users", UserRouter);
router.use("/tasks", TaskRouter);

export default router;