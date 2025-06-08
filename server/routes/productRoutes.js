import express from "express";
import { createProduct, updateProduct, deleteProduct } from "../controllers/ProductController.js";
import { protect } from "../controllers/AuthControllers.js";
import { AI_call } from "../controllers/Ai_apiControllers.js";

const ProductRouter = express.Router();

//To create New Products
ProductRouter.route('/createProduct').post(protect, createProduct);
ProductRouter.route('/createProductChat').post(protect, AI_call, createProduct);

// Update
ProductRouter.route('/updateProduct/:id').put(protect, updateProduct);
ProductRouter.route('/updateProductChat/:id').put(protect, AI_call, updateProduct);

// Delete
ProductRouter.route('/deleteProduct/:id').delete(protect, deleteProduct);
ProductRouter.route('/deleteProductChat/:id').delete(protect, AI_call, deleteProduct);

export { ProductRouter };