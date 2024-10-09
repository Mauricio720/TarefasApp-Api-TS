import { Router,Request, Response } from "express";
import { UserController } from "infra/controllers/UserController";

const router = Router();
router.post("/", async (req:Request, res:Response) => {
  return await UserController.create(req, res)
})
router.post("/auth", async (req:Request, res:Response) => {
  return await UserController.authenticate(req, res)
})

router.get("/auth/facebook", async (req:Request, res:Response) => {
  return await UserController.authenticateFacebook(req, res)
})

export default router