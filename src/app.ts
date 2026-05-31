import express, { type Application, type Request, type Response } from 'express'
import { logger } from './middleware/logger';
import { globalErrorHandler } from './middleware/globalErrorHandler';
import authRoutes from "./api/routes/auth.route"
import cookieParser from "cookie-parser"

const app: Application = express();
app.use(logger)
app.use(express.json())
app.use(cookieParser())

app.get("/", (req:Request, res: Response) => {
     // throw Error ("Server is dying")
     res.send("hello world");
})


app.use("/auth", authRoutes)
app.use(globalErrorHandler)

export default app