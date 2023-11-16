export interface IUser {
    _id?:string;
    name: string;
    email: string;
    password: string;
    address: string;
    role: "User" | "Admin";
    phoneNumber: string;
    createdAt?: string;
    updatedAt?: string; 
}