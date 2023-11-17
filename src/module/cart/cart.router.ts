import { Router } from "express";
import { verifyCart } from "./cart.validation";
import { createCart } from "./cart.controller";
import { verifyJwt } from "../../middleware/verifyJwt";

const router = Router();

router.post('/create-cart', verifyJwt, verifyCart, createCart);

export default router;