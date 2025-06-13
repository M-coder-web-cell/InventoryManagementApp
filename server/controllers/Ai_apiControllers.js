import express from 'express'
import { createProduct, updateProduct } from './ProductController.js';

const AI_call = async (req, res, next) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/groq_api', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: req.body.query })
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    console.log(data)
    req.action = data.action && data.action.toLowerCase();

    if (req.action === "add") {
      
      req.body = {...data} || {};
      delete req.body.action;

    } else if (req.action === "update") {
      
      req.filter = data.filter || {};
      req.body = data.updates || {};
    } else if (req.action === "delete" || req.action === "remove") {
      
      req.body = data.filter || {};
    } else {
      req.body = {...data};
      delete req.body.action;
    }
    console.log(req.body)
    next();
  } catch (err) {
    console.error("Error in AI_call:", err);
    return res.status(500).json({ status: "error", message: "AI_call failed" });
  }
};
const LLMhandling = async (req, res, next)=>{
    if(req.action && req.action.toLowerCase() === "add"){
        return await createProduct(req, res)
    }
    if(req.action && req.action.toLowerCase() === "update"){
        return await updateProduct(req, res)
    }
    if(req.action && req.action.toLowerCase() === "delete"){
        return await deleteProduct(req, res)
    }
}

export {AI_call, LLMhandling}