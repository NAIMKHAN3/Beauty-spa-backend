import { Types } from "mongoose";

export interface IProduct {
    _id?: string;
    name: string;
    price: number;
    image: string;
    description: string;
    category: Types.ObjectId;
    inStock: boolean;
    createdAt?:string;
    updatedAt?:string;
}