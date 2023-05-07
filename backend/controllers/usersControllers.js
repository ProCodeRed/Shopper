import asyncHandler from 'express-async-handler'
import Users from "../db/models/userModel.js";


// @desc: fetch all products
// @route: GET /api/products
// @access: PUBLIC
export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    res.send({ });
})