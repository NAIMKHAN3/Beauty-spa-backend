import { Router } from "express";
import { verifyCart } from "./cart.validation";
import { createCart, getCart } from "./cart.controller";
import { verifyJwt } from "../../middleware/verifyJwt";

const router = Router();

router.post('/create-cart', verifyJwt, verifyCart, createCart);
router.get('/get-cart', verifyJwt, getCart);

export default router;