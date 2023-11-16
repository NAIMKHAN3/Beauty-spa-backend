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
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await Product.find();
        res.status(200).send({
            success: true,
            message: "Product get success",
            data: result
        })
    }
    catch (err) {
        next(err)
    }
}
export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const result = await Product.findById(id);
        res.status(200).send({
            success: true,
            message: "Product get success",
            data: result
        })
    }
    catch (err) {
        next(err)
    }
}