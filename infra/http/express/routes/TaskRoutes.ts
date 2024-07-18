import { Router,Request, Response } from "express";
import { TaskController } from "infra/controllers/TaskController";

const router = Router();

router.get("/", async (req:Request, res:Response) => {
  return await TaskController.getAll(req, res)
})
router.post("/", async (req:Request, res:Response) => {
  return await TaskController.create(req, res)
})
export default router
