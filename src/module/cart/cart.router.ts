import { Router } from "express";
import { verifyCart } from "./cart.validation";
import { createCart, getCart, removeProduct } from "./cart.controller";
import { verifyJwt } from "../../middleware/verifyJwt";

const router = Router();

router.put('/remove-cart-product', verifyJwt, removeProduct);
router.post('/create-cart', verifyJwt, verifyCart, createCart);
router.get('/get-cart', verifyJwt, getCart);

export default router;