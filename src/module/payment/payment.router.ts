import express, { Router } from "express";
import { verifyJwt } from "../../middleware/verifyJwt";
import { createPayment, webhook } from "./payment.controller";

const router = Router();

router.post('/create-payment', verifyJwt, createPayment)
router.post("/webhook", express.raw({type: 'application/json'}), webhook)

export default router;