import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import UserModel from "../models/user.model.js";

const registerUser = asyncHandler(async (req, res) => {
    try {
      // checking for user Existence
      const { name, email, password } = req.body;
 
      const isUser = await UserModel.findOne({ email });
 
      if (isUser)
           throw new ApiError(209, "User with this email already exists");
 
      // hashing password
      const hashPassword = await UserModel.hashPassword(password);
 
      // creating user
      const user = await UserModel.create({ name, email, password: hashPassword })
 
      // removing password feild
      const userData = user.toObject();
      delete userData.password;
 
      // Sending the success response
      res.status(201)
           .json(
                new ApiResponse(201, userData, "User registered successfully")
           )
    } catch (error) {
         throw new ApiError(500, "Internal Server Error")
    }
})


const loginUser = asyncHandler(async (req, res) => {

    try {
      // recieving data
      const { email, password } = req.body;
 
      // finding user
      const user = await UserModel.findOne({ email }).select('+password');
 
      let isCorrectPassword = false;
 
      // user exist then check password
      if (user) {
           isCorrectPassword = await user.comparePassword(password);
      }
    
      if (!user || !isCorrectPassword)
           throw new ApiError(401, "Invalid email or password."); 
 
      // generating token
      const token = user.generateAuthToken();
 
      // Clean the user object for the response body
      const userData = user.toObject();
      delete userData.password;
 
 
      // sending response with cookies
      res.status(200)
           .cookie('token', token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
           })
           .json(new ApiResponse(
                200, userData, "User logged in successfully"
      ))
    } catch (error) {
         throw new ApiError(500, "Internal Server Error")
    }
})

const logoutUser = asyncHandler(async (req, res) => {
   
})

export { registerUser, loginUser, logoutUser }