import { Router } from "express";
import userRouter from "../module/auth/auth.index";
import categoryRouter from "../module/category/category.index";

const router = Router();


router.use('/auth', userRouter);
router.use('/category', categoryRouter);

export default router;