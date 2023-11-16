import { Router } from "express";
import { verifyProduct } from "./product.validation";
import { createProduct } from "./product.controller";

const router = Router();

router.post('/create-product', verifyProduct, createProduct);

export default router;