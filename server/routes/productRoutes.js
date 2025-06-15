import express from "express";
import { dynamic_limiter } from "../controllers/utils.js";
import { createProduct, updateProduct, deleteProduct, getProducts} from "../controllers/ProductController.js";
import { protect } from "../controllers/AuthControllers.js";
import { AI_call, LLMhandling} from "../controllers/Ai_apiControllers.js";

const ProductRouter = express.Router();


ProductRouter.route('/createProduct').post(protect, createProduct);
ProductRouter.route('/updateProduct/:id').put(protect, updateProduct);
ProductRouter.route('/deleteProduct/:id').delete(protect, deleteProduct);
ProductRouter.route('/getAllProducts').get( protect, getProducts);

ProductRouter.route('/LLMChat').post( protect, dynamic_limiter, AI_call, LLMhandling);

export { ProductRouter };