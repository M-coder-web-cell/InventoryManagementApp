import mongoose from "mongoose"

const ProductSchema= new mongoose.Schema({
    userid:{
        type:String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    category:{
        type: String,
    },
    quantity:{
        type: Number,
        required:true
    },
    color: String,
    size: String,
    UpdatedAt:{
        type: Date, 
        default: Date.now
    }
})

const Product = mongoose.model('Product', ProductSchema)

export {Product}