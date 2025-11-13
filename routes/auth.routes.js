import express from 'express';

 import {registerUser, loginUser} from '../controllers/auth.controller.js'
import { registrationValidationCheck, loginValidationCheck ,handleValidationError } from '../middlewares/validation/authValidator.middleware.js'

const router = express.Router();

router.post('/register', registrationValidationCheck, handleValidationError, registerUser);    

router.post('/login', loginValidationCheck, handleValidationError ,loginUser)

export default router;