import {
    ErrorRequestHandler,
    NextFunction,
    Request,
    RequestHandler,
    Response,
  } from 'express'
  import createError from 'http-errors'
  import { ValidationError } from 'express-validation'
import handleValidationError from './handleMongooseValidationError'
import config from '../config'
  
  export const notfoundandler: RequestHandler = (req, res, next) => {
    next(createError.NotFound())
  }
  
  const errorHandler: ErrorRequestHandler = async (
    err,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    let statusCode: number = 400
  
    let message: string = err.message
    let errorMessage 
    if (err instanceof ValidationError) {
      statusCode = err.statusCode
      message = err.message
      errorMessage = err?.details
  
    } else if (err.name === 'ValidationError') {
      const error = handleValidationError(err)
      statusCode = error.statusCode
      message = error.message
      errorMessage = error.errorMessages
    } else if (err.name === 'CastError') {
      ;(statusCode = 400),
        (message = 'Cast Error Invalid Id'),
        (errorMessage = [
          {
            path: err.path,
            message: err.message,
          },
        ])
    }
    res.status(statusCode).json({
      success: false,
      message,
      errorMessage,
      stack: config.env !== 'production' ? err?.stack : undefined,
    })
  }
  
  export default errorHandler
  