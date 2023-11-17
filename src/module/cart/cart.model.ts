import { Schema, model } from "mongoose";
import { ICart } from "./cart.interface";

const cartSchema = new Schema<ICart>({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product"
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
},{timestamps: true})

export const Cart = model<ICart>('Cart', cartSchema)