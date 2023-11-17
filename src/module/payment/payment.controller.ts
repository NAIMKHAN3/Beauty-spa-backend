import Stripe from 'stripe';
import config from '../../config';
import { NextFunction, Request, Response } from 'express';
import { Cart } from '../cart/cart.model';
import { Product } from '../product/product.model';
import { ICart } from '../cart/cart.interface';
import { IPayment } from './payment.interface';
import { Payment } from './payment.model';

const stripeSecretKey = config.stripe_secret_key;

if (!stripeSecretKey) {
    throw new Error("Stripe secret key is not set in environment variables")
}

const stripeInstance = new Stripe(stripeSecretKey, { apiVersion: "2023-10-16" });

export const createPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { cart } = req.body;
        const { email,_id } = req.user;
        const cartInfo = await Cart.findById(cart).populate("user product")
        const findProduct = await Product.findById(cartInfo?.product)

        if (!findProduct || !cartInfo) {
            return res.status(400).send({
                success: false,
                message: "Product not found"
            })
        }

        const amount = cartInfo?.price as number * 100;
        const product = await stripeInstance.products.create({
            name: findProduct.name
        })
        const price = await stripeInstance.prices.create({
            unit_amount: amount,
            currency: "usd",
            product: product.id

        })
        let customerId: string;
        const existingCustomer = await stripeInstance.customers.list({ email })
        if (existingCustomer?.data?.length) {
            customerId = existingCustomer.data[0].id;
        }
        else {
            const customer = await stripeInstance.customers.create({
                email,
                description: "new customer"
            })
            customerId = customer.id;
        }
        const session = await stripeInstance.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            customer: customerId,
            line_items: [{
                price: price.id,
                quantity: cartInfo.quantity
            }],
            success_url: "http://localhost:3000/payment/success",
            cancel_url: "http://localhost:3000/payment/failed"
        })
        const paymentInfo:IPayment = {
            user: _id,
            sessionId: session.id,
            cart,
        }
        const result = await Payment.create(paymentInfo)
        res.status(200).send({
            status: true,
            sessionId: session
        })
    }
    catch (err) {
        next(err)
    }
}