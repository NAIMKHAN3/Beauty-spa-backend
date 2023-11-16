import { Joi, validate } from "express-validation";

const cartValidation = {
    body: Joi.object({
        product: Joi.string().required(),
        quantity: Joi.number().required(),
    })
}

export const verifyCart = validate(cartValidation)