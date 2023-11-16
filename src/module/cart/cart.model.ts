import { Schema, model } from "mongoose";
import { ICart } from "./cart.interface";

const cartSchema = new Schema<ICart>({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    product: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
})

export const Cart = model<ICart>('Cart', cartSchema)