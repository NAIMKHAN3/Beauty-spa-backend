import { Router } from "express";
import { verifyCategory } from "./category.validation";
import { createCategory } from "./category.controller";

const router = Router();

router.post('/create-category', verifyCategory, createCategory)

export default router;