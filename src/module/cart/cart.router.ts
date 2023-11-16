import { Router } from "express";
import { verifyCart } from "./cart.validation";
import { createCart } from "./cart.controller";

const router = Router();

router.post('/create-cart', verifyCart, createCart);

export default router;