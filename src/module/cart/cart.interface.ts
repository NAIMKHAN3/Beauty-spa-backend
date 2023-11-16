import { Types } from "mongoose";

export interface ICart {
    _id?:string;
    user: Types.ObjectId;
    product:Types.ObjectId;
    quantity: number;
    price: number;
    createAt?:string;
    updatedAt?:string;
}