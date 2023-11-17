import { Router } from "express";
import userRouter from "../module/auth/auth.index";
import categoryRouter from "../module/category/category.index";
import uploadRouter from "../module/fileUpload";
import cartRouter from "../module/cart/cart.index";
import productRouter from "../module/product/product.index";
import paymentRouter from "../module/payment/payment.index";

const router = Router();


router.use('/auth', userRouter);
router.use('/category', categoryRouter);
router.use('/file', uploadRouter);
router.use('/product', productRouter);
router.use('/cart', cartRouter);
router.use('/payment', paymentRouter);

export default router;