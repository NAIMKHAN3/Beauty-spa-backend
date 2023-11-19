import { NextFunction, Request, Response } from "express";
import { Product } from "./product.model";
import { searchTermDefination } from "../../utils/searchTerm";

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await Product.create(req.body);
        res.status(201).send({
            success: true,
            message: "create product success",
            data: result
        })
    }
    catch (err) {
        next(err)
    }
}
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { searchTerm, page, limit,category} = req.query;
        const skipPage = (parseInt(page as string) - 1) || 0;
        const itemPerPage = (parseInt(limit as string)) || 10;

        let filterAndSerch = [];
        if (typeof searchTerm === 'string' && searchTerm.length > 2) {
            filterAndSerch.push(searchTermDefination(searchTerm));

        }
        
        if (category !== "null") {
            filterAndSerch.push({ category });
        }
        const conditions = filterAndSerch.length > 0 ? { $and: filterAndSerch } : {};
        const  result = await Product.find(conditions).populate('category')
            .skip(skipPage * itemPerPage)
            .limit(itemPerPage);

           
        
        const total = await Product.count(conditions);

        res.status(200).send({
            success: true,
            meta:{
                totalPages: Math.ceil(total / itemPerPage)
            },
            message: "Product get success",
            data: result
        })
    }
    catch (err) {
        next(err)
    }
}
export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const result = await Product.findById(id).populate('category');
        res.status(200).send({
            success: true,
            message: "Product get success",
            data: result
        })
    }
    catch (err) {
        next(err)
    }
}
export const getProductByCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {category} = req.params;
        const result = await Product.find({category}).populate('category');
        res.status(200).send({
            success: true,
            message: "Product get success",
            data: result
        })
    }
    catch (err) {
        next(err)
    }
}