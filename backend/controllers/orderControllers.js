import asyncHandler from 'express-async-handler'
import Order from "../db/models/orderModel.js";


// @desc: create new order
// @route: POST /api/order
// @access: PRIVATE


export const addOrderItems = asyncHandler(async (req, res) => {
    const {orderItems, paymentMethod, shippingAddress, itemsPrice, shippingPrice, taxPrice, totalPrice} = req.body
    
    if(cartItems && cartItems.length === 0){
        res.status(400)
        throw new Error("No order items");
        return
        
    }else{
        const order = new Order(
            {
                user: req.user._id,
                orderItems,
                paymentMethod,
                shippingAddress, 
                itemsPrice, 
                shippingPrice, 
                taxPrice, 
                totalPrice
            }
        )

        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})