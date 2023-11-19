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
        const { email, _id } = req.user;
        const cartInfo = await Cart.findById(cart)
        const count = await Cart.count();
        const orderNumber = `ORD2023${count + 1}`
        if (!cartInfo) {
            return res.status(400).send({
                success: false,
                message: "Product not found"
            })
        }

        const amount = Number((cartInfo?.totalPrice as number * 100).toFixed(2));
        const product = await stripeInstance.products.create({
            name: "Beauty Spa Product"
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
                quantity: 1,
            }],
            success_url: "https://beauty-spa-client.vercel.app/payment/success",
            cancel_url: "https://beauty-spa-client.vercel.app/payment/failed"
        })
        const findCart = await Payment.findOne({ cart })
        if (findCart) {
            findCart.sessionId = session.id;
            await findCart.save();
        } else {
            const paymentInfo: IPayment = {
                orderNumber,
                user: _id,
                sessionId: session.id,
                cart,
            }
            const result = await Payment.create(paymentInfo)
        }
        cartInfo.status = "ACCEPT";
        await cartInfo.save();

        res.status(200).send({
            success: true,
            sessionId: session
        })
    }
    catch (err) {
        next(err)
    }
}



export const webhook = async (req: Request, res: Response) => {
    const endpointSecret = config.stripe_endpoint_key;
    let data;
    let evenType;
    if (endpointSecret) {
        try {
            data = req.body.data.object;
            evenType = req.body.type;
            const findPaymentInfo = await Payment.findOne({ sessionId: data.id })
            if (evenType === 'checkout.session.completed') {
                if (data.payment_status === 'paid' && findPaymentInfo) {
                    findPaymentInfo.paymentStatus = "SUCCESS";
                    await findPaymentInfo.save();
                }
            } else {
                if (findPaymentInfo) {
                    findPaymentInfo.paymentStatus = "FAILED"
                    await findPaymentInfo.save();
                }
            }
        } catch (err) {
            console.log("weebhook error", err);
            res.status(400).send({ status: false, WebhookError: `${err}` });
            return;
        }
    }
};


export const getMyOrderNumber = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id } = req.user;
        const orderNumber = await Payment.find({ user: _id }).select("orderNumber")
        res.status(200).send({
            success: true,
            message: "Order Get Success",
             data: orderNumber
        })
    } catch (err) {
        next(err)
    }
}
export const getOrderByNumber = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { order } = req.params;
        const result = await Payment.findOne({orderNumber:order}).populate({
            path: 'cart',
            model:'Cart',
            populate: {
                path: 'product.product',
                model: 'Product',
            },
        })
            .exec();
            res.status(200).send({
                success: true,
                message: "Order Get Success",
                 data: result
            })
    } catch (err) {
        next(err)
    }
}