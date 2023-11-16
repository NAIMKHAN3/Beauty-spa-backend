import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt'
import { User } from "./auth.model";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10)
        const result = await User.create(req.body)
        const user = await User.findById(result._id).select('-password')
        res.status(201).send({
            success: true,
            message: "User created success",
            data: user
        })
    }
    catch (err) {
        next(err)
    }
}