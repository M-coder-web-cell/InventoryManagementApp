import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from 'cors'

import { ProductRouter } from "./routes/productRoutes.js"
import { UserRouter } from "./routes/UserRoutes.js"

dotenv.config()

const app = express()

const allowedOrigins = ['http://localhost:5173']

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true)
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = `The CORS policy for this site does not allow access from the specified Origin.`
      return callback(new Error(msg), false)
    }
    return callback(null, true)
  },
  credentials: true,
}))

app.use(cookieParser())
app.use(express.json())

const mainURL= "/api/invenmgm"

app.use(`${mainURL}/products`, ProductRouter)
app.use(`${mainURL}/users`, UserRouter)

export {app}
