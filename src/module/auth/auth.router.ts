import { Router } from "express";
import { createUser, loginUser } from "./auth.controller";
import { verifyLogin, verifyRegister } from "./auth.validation";

const router = Router();

router.post('/create-user', verifyRegister, createUser);
router.post('/login-user', verifyLogin, loginUser);

export default router;