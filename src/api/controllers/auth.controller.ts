import type { Request, Response } from "express";
import authService from "../services/auth.service";
import { sendResponse } from "../../utils/sendResponse";
import { signToken, verifyToken } from "../../utils/jwt";
import { ref } from "node:process";


export const signup = async (req: Request, res: Response) => {
  
   const user = await authService.createUser(req.body)
   if(!user){
    sendResponse(res, {message: "Failed to Create"}, 400)
     return
}

   sendResponse(res, { message: "User Created Successfully!", data: user}, 200)
};



// login part
export const login = async (req: Request, res: Response) => {
  
   // const user = await authService.createUser(req.body)
   
   const {email, password} = req.body
   const user = await authService.validateUser(email, password)

   if (!user) {
      sendResponse(res, {message: "Invalid email or password"} , 401)

      return;
   }
   
   
   const {accessToken,refreshToken }= signToken(user)

   const result = {
      user:user,
      accessToken:accessToken,
      refreshToken:refreshToken
   }

   res.cookie("refreshToken", refreshToken, {
      sameSite: "lax",
      httpOnly: true,
      secure: false
   })

   return sendResponse(res, {message: "User Login Successful!", data: result})


};


export const refresh = async (req: Request, res: Response) => {


   const refreshToken = req.cookies?.refreshToken

   if(!refreshToken) {
      return sendResponse (res, {message: "refresh token not found"}, 401)
   }
 
   const payload = verifyToken(refreshToken, "refresh")
    if(!refreshToken) {
      return sendResponse (res, {message: "invalid refresh token"}, 401)
   }

   const user =  await authService.getUserById(payload.id)
   if(!user) {
      return sendResponse(res, {message: "User Not Found"}, 401)
   }
   
   const {accessToken, refreshToken: newRefreshToken } = signToken(user)

   res.cookie("refreshToken", newRefreshToken, {
      secure: false,
      sameSite: "lax",
      httpOnly: true


   })

   sendResponse(res, {
      message: "Token refreshed", data: {
         accessToken,
         newRefreshToken
      }
   })
}




