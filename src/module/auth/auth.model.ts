import { Schema, model } from "mongoose";
import { IUser } from "./auth.interface";

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["User", "Admin"],
        default: "User"
    },
    address: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
},{timestamps: true})


export const User = model<IUser>('User', userSchema);