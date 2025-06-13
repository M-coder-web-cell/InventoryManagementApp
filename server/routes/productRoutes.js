import express from "express";
import { createProduct, updateProduct, deleteProduct, getProducts} from "../controllers/ProductController.js";
import { protect } from "../controllers/AuthControllers.js";
import { AI_call, LLMhandling} from "../controllers/Ai_apiControllers.js";

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

ProductRouter.route('/LLMChat').post(protect, AI_call, LLMhandling);
// Get all products
ProductRouter.route('/getAllProducts').get( protect, getProducts);
export { ProductRouter };