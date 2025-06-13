import express from "express";
import { createProduct, updateProduct, deleteProduct, getProducts} from "../controllers/ProductController.js";
import { protect } from "../controllers/AuthControllers.js";
import { AI_call, LLMhandling} from "../controllers/Ai_apiControllers.js";

const ProductRouter = express.Router();


ProductRouter.route('/createProduct').post(protect, createProduct);
ProductRouter.route('/updateProduct/:id').put(protect, updateProduct);
ProductRouter.route('/deleteProduct/:id').delete(protect, deleteProduct);


ProductRouter.route('/LLMChat').post(protect, AI_call, LLMhandling);
// Get all products
ProductRouter.route('/getAllProducts').get( protect, getProducts);
export { ProductRouter };