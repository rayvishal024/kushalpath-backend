import { body, validationResult } from 'express-validator'
import {ApiError} from '../../utils/ApiError.js'

export const registrationValidationCheck = [
     // name validate
     body('name')
          .notEmpty().withMessage('Name is required')
          .isAlpha('en-US', { ignore: ' ' }).withMessage('Name can only contain alphabets and spaces')
          .trim(),
     
     body('email')
          .notEmpty().withMessage('Email is required')
          .isEmail().withMessage('Provide Valid Email')
          .normalizeEmail(),
     
     body('password')
          .notEmpty().withMessage('Password is Required')
          .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
]

export const loginValidationCheck = [
     body('email')
          .notEmpty().withMessage('Email is required')
          .isEmail().withMessage('Provide Valid Email')
          .normalizeEmail(),
     
     body('password')
          .notEmpty().withMessage('Password is Required')
          .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
]

export const handleValidationError = (req, res, next) => {
     const errors = validationResult(req);

     // if error is empty
     if (errors.isEmpty())
          return next();
     
     // sending error response

     // Extracting all Error
     const extractedErrors = errors.array();

     // creating single message
     const primaryMessage = extractedErrors
          .map(err => `[${err.param}]: ${err.msg}`)
          .join(' | ');
     
     // throw Error
     throw new ApiError(
          399,
          `validation Failed : ${primaryMessage}`,
          extractedErrors
     )
}