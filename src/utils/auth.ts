import type { NextFunction, Request, Response } from "express";
import { sendResponse } from "./sendResponse";
import { verifyToken } from "./jwt";
import authService from "../api/services/auth.service"
import type { Role } from "../types";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
 
        const token = req.headers.authorization
     
        if(!token) {
           return sendResponse (res, {message: "token not found"}, 401)
        }
      
        const payload = verifyToken(token, "access")
         
        if(!payload) {
           return sendResponse (res, {message: "invalid token"}, 401)
        }

        const user =  await authService.getUserById(payload.id)
           
        if(!user) {
              return sendResponse(res, {message: "User Not Found"}, 401)
           }

           req.user = user
           next()
        
        
 
};


     export const authorizeRole = (...roles: Role[]) => {
        return (req: Request, res: Response, next: NextFunction) => {

         if (!req.user){
            return res. send("unauthorize")
         }

         if(!roles.includes(req.user.role)){
            return res.send("You dont have permission")
         }
          
         return next()

        }

   
};  

