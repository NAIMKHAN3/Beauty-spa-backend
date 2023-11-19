import { Router } from "express";
import { verifyProduct } from "./product.validation";
import { createProduct, getProductByCategory, getProductById, getProducts } from "./product.controller";

const router = Router();

router.post('/create-product', verifyProduct, createProduct);
router.get('/get-products',  getProducts);
router.get('/get-product-by-id/:id',  getProductById);
router.get('/get-product-by-category/:category',  getProductByCategory);

export default router;