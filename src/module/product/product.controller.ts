import { NextFunction, Request, Response } from "express";
import { Product } from "./product.model";

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await Product.create(req.body);
        res.status(201).send({
            success: true,
            message: "create product success",
            data: result
        })
    }
    catch (err) {
        next(err)
    }
}