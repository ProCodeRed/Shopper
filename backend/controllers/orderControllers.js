import asyncHandler from 'express-async-handler'
import Order from "../db/models/orderModel.js";


// @desc: create new order
// @route: POST /api/order
// @access: PRIVATE

export const addOrderItems = asyncHandler(async (req, res) => {
    const {orderItems, paymentMethod, shippingAddress, itemsPrice, shippingPrice, taxPrice, totalPrice} = req.body
    
    if(orderItems && orderItems.length === 0){
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


// @desc: get order by id
// @route: GET /api/order:id
// @access: PRIVATE

export const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if(order){
        res.json(order)
    }else{
        res.status(404)
        throw new Error("No Order not Found");
        
    }
})


// @desc: update order to paid
// @route: PUT /api/order:id/pay
// @access: PRIVATE

export const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if(order){
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            updateTime: req.body.update_time,
            email_address: req.body.payer.email_address,
        }

        const updatedOrder = await order.save()
        res.json(updatedOrder)

    }else{
        res.status(404)
        throw new Error("No Order not Found");
        
    }
})