import { Types } from "mongoose";

export interface IPayment {
    _id?:string;
    user: Types.ObjectId
    sessionId: string;
    cart: Types.ObjectId;
    paymentStatus?: "PENDING" | "SUCCESS" | "FAILED"
    createdAt?: string;
    updatedAt?:string;
}