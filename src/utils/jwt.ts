import config from "../config";
import type { RUser } from "../types";
import jwt, { type Jwt, type JwtPayload } from "jsonwebtoken"


export const verifyToken = (token: string, type: "access" | "refresh") => {
    const secret = type === "access" ? config.jwt_secret : config.refresh_secret
    const decode = jwt.verify(token, secret)
    return decode as JwtPayload
}


export const signToken = (payload: RUser & {id:number}) => {
    //accessToken ==> data access
    const accessToken = jwt.sign(payload, config.jwt_secret, {
        expiresIn: "22d"
    })


      const refreshToken = jwt.sign(payload, config.refresh_secret, {
        expiresIn: "27d"
    })

    return {accessToken, refreshToken}
    //refreshToken ==> accessToken abar genarate korbe


   

};


// console.log(signToken({age:123, email:"hello@gmail.com", name:"test", role: "admin" }))
