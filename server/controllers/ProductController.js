import { Product } from "../models/ProductModel.js";
import { AI_call } from "./Ai_apiControllers.js";

const createProduct = async (req, res) => {
  try {
    const { name, category, quantity, size, color, sellerid, query } = req.body;

    if ((!name || !category || !quantity || !sellerid) && !query) {
      return res.status(400).json({ status: "fail", message: "Missing fields" });
    }

    if (query) {
      const data = await AI_call(query);

      if (!data) {
        return res.status(400).json({ status: "fail", message: "AI response is empty or failed" });
      }

      if(data.action?.toLowerCase().trim() === "add"){
        
        const { name, category, sellerid, size, color, quantity } = data;

        const product = await new Product({
          name,
          category,
          sellerid,
          size,
          quantity,
          color
        });

        const newProduct = await product.save();

        const cleanProduct = newProduct.toObject({ versionKey: false });
        delete cleanProduct._id;

        return res.status(201).json({
          status: "success",
          product: cleanProduct,
        });
      } else {
        return res.status(400).json({ status: "fail", message: "Unsupported action" });
      }
    } else {
      const product = new Product({
        name,
        category,
        sellerid,
        size,
        color,
        quantity
      });

      const newProduct = await product.save();

      const cleanProduct = newProduct.toObject({ versionKey: false });
      delete cleanProduct._id;

      return res.status(201).json({
        status: "success",
        product: cleanProduct,
      });
    }

  } catch (err) {
    console.error("Error in createProduct:", err);
    res.status(500).json({ status: "error", message: "Server Error" });
  }
};

export { createProduct };

