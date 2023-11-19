import { Types } from "mongoose";

type ICartProduct = {
    product:Types.ObjectId,
    quantity: number,
    price: number,
}

export interface ICart {
    _id?:string;
    user: Types.ObjectId;
    product:ICartProduct[];
    totalPrice: number;
    status?: "PENDING" | "ACCEPT";
    createAt?:string;
    updatedAt?:string;
}