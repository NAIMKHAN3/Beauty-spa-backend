import { Router } from "express";
import { verifyCategory } from "./category.validation";
import { createCategory, getCategory } from "./category.controller";
import { verifyJwt } from "../../middleware/verifyJwt";

const router = Router();

router.post('/create-category', verifyCategory, createCategory)
router.get('/get-category', verifyJwt,  getCategory)

export default router;