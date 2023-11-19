import { NextFunction, Request, Response } from "express";
import { Product } from "../product/product.model";
import { Cart } from "./cart.model";
import { ICart } from "./cart.interface";

export const createCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Cart.deleteMany({})
        const product = await Product.findById(req.body.product)
        if (!product) {
            return res.status(404).send({
                success: false,
                message: "Product Not Fount"
            })
        }
        const { _id } = req.user;
        const cart = await Cart.findOne({ user: _id, status: "PENDING" })
        if (!cart) {
            const newProduct: ICart = {
                user: _id,
                product: [{
                    product: req.body.product,
                    quantity: req.body.quantity,
                    price: product.price * req.body.quantity
                }],
                totalPrice: product.price * req.body.quantity
            }

            const result = await Cart.create(newProduct)
        } else {
            const updateProduct = {
                product: req.body.product,
                quantity: req.body.quantity,
                price: product.price * req.body.quantity
            }
            cart.product.push(updateProduct),
                cart.totalPrice = cart.totalPrice + product.price * req.body.quantity
        }


        res.status(201).send({
            success: true,
            message: "Cart Added Success"
        })
    }
    catch (err) {
        next(err)
    }
}