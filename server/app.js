import express from "express"
import dotenv from "dotenv"
import bodyParser from 'body-parser'
import { ProductRouter } from "./routes/productRoutes.js"
import { UserRouter } from "./routes/UserRoutes.js"
import cookieParser from "cookie-parser"

const mainURL= "/api/invenmgm"
const app = express()

dotenv.config()

app.use(cookieParser());
app.use(bodyParser.json());    

app.use(`${mainURL}/products`, ProductRouter)
app.use(`${mainURL}/users`, UserRouter)

export {app}