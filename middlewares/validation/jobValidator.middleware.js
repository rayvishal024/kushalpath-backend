import { body } from 'express-validator'

// Define the list of allowed categories once
const VALID_JOB_CATEGORIES = ["government", "private", "internship", "apprenticeship", "other"];


export const jobCreationValidationChecks = [

     // 1. Title Validation
     body('title')
          .notEmpty().withMessage('Job title is required')
          .trim(),

     // 2. Description Validation
     body('description')
          .notEmpty().withMessage('Job description is required'),

     // 3. Category Validation (Single String)
     body('category')
          .notEmpty().withMessage('Category is required')
          // Checks if the input string is one of the allowed enum values
          .isIn(VALID_JOB_CATEGORIES).withMessage(`Category must be one of: ${VALID_JOB_CATEGORIES.join(', ')}`)
          .trim(),

     // 4. Apply Link Validation (Must be a URL)
     body('applyLink')
          .notEmpty().withMessage('Application link is required')
          // Ensures the link is in a valid URL format
          .isURL().withMessage('Application link must be a valid URL'),
];