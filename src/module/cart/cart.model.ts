import { Schema, model } from "mongoose";
import { ICart } from "./cart.interface";

const cartSchema = new Schema<ICart>({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    product: [{
            product: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: "Product"
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
        }],
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["PENDING", "ACCEPT"],
        default: "PENDING"
    }
}, { timestamps: true })

export const Cart = model<ICart>('Cart', cartSchema)