import asyncHandler from 'express-async-handler'
import Product from "../db/models/productModel.js";


// @desc: fetch all products
// @route: GET /api/products
// @access: PUBLIC
const getProducts = asyncHandler(async (req, res) => {
    const products =  await Product.find({})
    // throw new Error('Not found !')
    res.json(products)
})


// @desc: fetch product by id
// @route: GET /api/products/:id
// @access: PUBLIC
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    // if product found then gives project object or just erroe obj
    // product ? res.json(product) : res.status(404).json({message: 'Product not found !'})
    
    // error using custom errorHandler middleware
    if(product){
        res.json(product)
    }else{
        res.status(404);
        throw new Error('Product not found !')  
    }
    
    
})


export {getProducts, getProductById}