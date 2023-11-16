import mongoose from 'mongoose'

const handleValidationError = (error: mongoose.Error.ValidationError) => {
  const errors = Object.values(error.errors).map(
    (error: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: error.path,
        message: error.message,
      }
    },
  )
  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}

export default handleValidationError
