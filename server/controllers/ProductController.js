import { Product } from "../models/ProductModel.js";

const createProduct = async (req, res) => {
  try {
    console.log(req.body)
    const { name, category, quantity, size, color } = req.body;

    if (!name || !quantity) {
      return res.status(400).json({ status: "fail", message: "Missing fields" });
    }

      if (!req.action) {
        return res.status(400).json({ status: "fail", message: "AI response is empty or failed" });
      }

      if(req.action && req.action.toLowerCase() === "add"){

        const sellerid = req.userid
        const product = await new Product({
          name,
          category,
          userid: sellerid,
          size,
          quantity,
          color
        });

        const newProduct = await product.save();

        return res.status(201).json({
          status: "success",
          product: newProduct,
        });
      } else {
        return res.status(400).json({ status: "fail", message: "Unsupported action" });
      }

  } catch (err) {
    console.error("Error in createProduct:", err);
    res.status(500).json({ status: "error", message: "Server Error" });
  }
};
const updateProduct = async (req, res) => {
  try {
    
    const updates = req.body;
    
    if(req.action && req.action.toLowerCase()==="update"){
      const product = await Product.findOneAndUpdate(
        {...req.filter, userid:req.userid}, 
        updates,
         { new: true });

      if (!product) {
        return res.status(404).json({ status: "fail", message: "Product not found" });
      }

      return res.status(200).json({
        status: "success",
        product,
      });
    }
  } catch (err) {
    console.error("Error in updateProduct:", err);
    res.status(500).json({ status: "error", message: "Server Error" });
  }
};
const deleteProduct = async (req, res) => {
  try {

    if(req.action && req.action.toLowerCase() === "remove"){
      const product = await Product.findOneAndDelete({...req.body, userid : req.userid});


      if (!product) {
        return res.status(404).json({ status: "fail", message: "Product not found" });
      }

      return res.status(200).json({
        status: "success",
        message: "Product deleted successfully",
        product
      });
    }
  } catch (err) {
    console.error("Error in deleteProduct:", err);
    res.status(500).json({ status: "error", message: "Server Error" });
  }
}; //jab bhi frontend ka kaam karoge frontend ke url parameters se id leke backend ke params mein pass kardena 


const getProducts = async (req, res) => {
  try {
    const sellerid = req.userid;
    if (!sellerid) {
      return res.status(401).json({ status: "fail", message: "Unauthorized" });
    }

    const products = await Product.find({ userid: sellerid });

    
    return res.status(200).json({
      status: "success",
      products
    });
  } catch (err) {
    console.error("Error in getProducts:", err);
    res.status(500).json({ status: "error", message: "Server Error" });
  }
};
export { createProduct, updateProduct, deleteProduct, getProducts };