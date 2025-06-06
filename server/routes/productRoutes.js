import express from "express"
import { createProduct } from "../controllers/ProductController.js"
import {protect} from "../controllers/AuthControllers.js"

const ProductRouter = express.Router()

ProductRouter
    .route('/createProduct')
    .post(protect, createProduct)

export {ProductRouter}