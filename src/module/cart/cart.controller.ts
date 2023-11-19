import { NextFunction, Request, Response } from "express";
import { Product } from "../product/product.model";
import { Cart } from "./cart.model";
import { ICart } from "./cart.interface";
import { Payment } from "../payment/payment.model";

export const createCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
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
                totalPrice: Number((product.price * req.body.quantity).toFixed(2))
            }

            const result = await Cart.create(newProduct)
        } else {
            const updateProduct = {
                product: req.body.product,
                quantity: req.body.quantity,
                price: product.price * req.body.quantity
            }
            cart.product.push(updateProduct),
                cart.totalPrice = Number((cart.totalPrice + (product.price * req.body.quantity)).toFixed(2));
            await cart.save()
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
export const getCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id } = req.user;
        const cart = await Cart.findOne({ user: _id, status: "PENDING" }).populate({
            path: 'product.product',
        })



        res.status(200).send({
            success: true,
            message: "Cart get Success",
            product: cart?.product.length || 0,
            data: cart
        })
    }
    catch (err) {
        next(err)
    }
}
export const removeProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id } = req.user;
        const { cart, product } = req.body
        const result = await Cart.findOne({ _id: cart, status: "PENDING" })

        if (!result) {
            return res.status(400).send({
                success: false,
                message: "Cart not found",
            })
        }
        const filterProduct = result.product.filter(item => item.product.toString() !== product)
        const findProduct = result.product.find(item => item.product.toString() === product)
        if (findProduct && filterProduct) {
            result.product = filterProduct;
            result.totalPrice = Number((result.totalPrice - findProduct.price).toFixed(2))
            await result.save()
        }



        res.status(200).send({
            success: true,
            message: "Cart remove Product Success",
        })
    }
    catch (err) {
        next(err)
    }
}