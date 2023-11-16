import { Router } from "express";
import userRouter from "../module/auth/auth.index";
import categoryRouter from "../module/category/category.index";
import uploadRouter from "../module/fileUpload";

const router = Router();


router.use('/auth', userRouter);
router.use('/category', categoryRouter);
router.use('/file', uploadRouter);

export default router;