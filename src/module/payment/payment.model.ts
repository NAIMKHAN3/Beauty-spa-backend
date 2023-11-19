import { Schema, model } from "mongoose";
import { IPayment } from "./payment.interface";

const paymentSchema = new Schema<IPayment>({
    orderNumber:{
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    sessionId: {
        type: String,
        required: true
    },
    cart: {
        type: Schema.Types.ObjectId,
        required: true
    },
    paymentStatus: {
        type: String,
        required: true,
        enum: ["PENDING", "SUCCESS", "FAILED"],
        default: "PENDING"
    }
}, { timestamps: true })

export const Payment = model<IPayment>('Payment', paymentSchema)