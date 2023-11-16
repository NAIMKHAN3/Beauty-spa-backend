import { NextFunction, Request, Response } from "express";
import { Product } from "../product/product.model";
import { Cart } from "./cart.model";

export const createCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await Product.findById(req.body.product)
        const { _id } = req.user;
        req.body.user = _id;
        if (product) {
            req.body.price = product.price * req.body.quantity
        }
        const result = await Cart.create(req.body)
        res.status(201).send({
            success: true,
            message: "Cart Added Success",
            data: result
        })
    }
    catch (err) {

    }
}