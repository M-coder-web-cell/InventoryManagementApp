import express from "express"
import { createProduct } from "../controllers/ProductController.js"
import {protect} from "../controllers/AuthControllers.js"
import { AI_call } from "../controllers/Ai_apiControllers.js"

const ProductRouter = express.Router()

ProductRouter
    .route('/createProduct')
    .post(protect, createProduct)
ProductRouter
    .route('/createProductChat')
    .post(protect, AI_call, createProduct)
export {ProductRouter}