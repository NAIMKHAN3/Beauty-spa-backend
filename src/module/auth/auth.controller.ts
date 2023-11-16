import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt'
import { User } from "./auth.model";
import createToken from "../../utils/token.utils";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10)
        const findUser = await User.findOne({email: req.body.email})
        console.log(findUser)
        if(findUser){
          return  res.status(400).send({
                success: false,
                message: "User already exist",
                
            })
        }
        const result = await User.create(req.body)
        const user = {
            _id:result._id,
            name: result.name,
            email: result.email,
            address: result.address,
            phoneNumber: result.phoneNumber
        }



        const accessToken = createToken("ACCESS", user)
        const refreshToken = createToken("REFRESH", user)

        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            path: '/'
        })


        res.status(201).send({
            success: true,
            message: "User created success",
            data: user,
            accessToken
        })
    }
    catch (err) {
        next(err)
    }
}