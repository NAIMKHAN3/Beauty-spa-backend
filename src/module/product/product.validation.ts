import { Joi, validate } from "express-validation";

const productValidation = {
    body: Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        image: Joi.string().required(),
        description: Joi.string().required(),
        category: Joi.string().required(),
    })
}

export const verifyProduct = validate(productValidation)