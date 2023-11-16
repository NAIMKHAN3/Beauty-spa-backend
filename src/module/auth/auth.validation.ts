import {Joi, validate} from 'express-validation'
const registerValidation = {
    body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        address: Joi.string().required(),
        phoneNumber: Joi.string().required(),
    })
}

export const verifyRegister =  validate(registerValidation)