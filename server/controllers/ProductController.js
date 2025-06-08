import { Product } from "../models/ProductModel.js";

const createProduct = async (req, res) => {
  try {
    const { name, category, quantity, size, color, sellerid } = req.body;

    if (!name || !category || !quantity || !sellerid) {
      return res.status(400).json({ status: "fail", message: "Missing fields" });
    }

      if (!req.action) {
        return res.status(400).json({ status: "fail", message: "AI response is empty or failed" });
      }

      if(req.action === "add"){

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

  } catch (err) {
    console.error("Error in createProduct:", err);
    res.status(500).json({ status: "error", message: "Server Error" });
  }
};

export { createProduct };

