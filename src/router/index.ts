import { Router } from "express";
import userRouter from "../module/auth/auth.index";

const router = Router();


router.use('/auth', userRouter);

export default router;