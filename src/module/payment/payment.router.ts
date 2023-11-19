import express, { Router } from "express";
import { verifyJwt } from "../../middleware/verifyJwt";
import { createPayment, getMyOrderNumber, getOrderByNumber, webhook } from "./payment.controller";

const router = Router();

router.post('/create-payment', verifyJwt, createPayment)
router.post("/webhook", express.raw({ type: 'application/json' }), webhook)
router.get('/get-order/:order', verifyJwt, getOrderByNumber)
router.get('/get-order-number', verifyJwt, getMyOrderNumber)

export default router;