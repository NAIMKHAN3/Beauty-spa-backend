import { NextFunction, Request, Response } from "express";
import { Category } from "./category.model";

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await Category.create(req.body)
        res.status(201).send({
            success: true,
            message: "Category create success",
            data: result
        })
    }
    catch (err) {
        next(err)
    }
}
export const getCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await Category.find();
        res.status(200).send({
            success: true,
            message: "Category get success",
            data: result
        })
    }
    catch (err) {
        next(err)
    }
}