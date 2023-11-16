import { Router } from "express";
import { createUser } from "./auth.controller";
import { verifyRegister } from "./auth.validation";

const router = Router();

router.post('/create-user', verifyRegister, createUser);

export default router;