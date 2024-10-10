import express from "express";
import { addOrderItems, getOrderById, getUsersAllOrders, updateOrderToPaid } from "../controllers/orderControllers.js";
import { protectedRoute } from "../middleware/authMiddleware.js";


const router = express.Router();

router.route('/').post(protectedRoute, addOrderItems) // route to create new order
router.route('/myorders').get(protectedRoute, getUsersAllOrders) // route to get all orders's list created by user
router.route('/:id').get(protectedRoute, getOrderById) // route to get order by it's ID
router.route('/:id/pay').put(protectedRoute, updateOrderToPaid) // route to update order pay



export default router;