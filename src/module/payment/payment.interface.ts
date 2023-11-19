import { Types } from "mongoose";

export interface IPayment {
    _id?:string;
    orderNumber: string;
    user: Types.ObjectId
    sessionId: string;
    cart: Types.ObjectId;
    paymentStatus?: "PENDING" | "SUCCESS" | "FAILED"
    createdAt?: string;
    updatedAt?:string;
}