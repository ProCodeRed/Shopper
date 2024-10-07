import express from "express";
import { addOrderItems, getOrderById, updateOrderToPaid } from "../controllers/orderControllers.js";
import { protectedRoute } from "../middleware/authMiddleware.js";


const router = express.Router();

router.route('/').post(protectedRoute, addOrderItems) // route to create new order
router.route('/:id').get(protectedRoute, getOrderById) // route to get order by it's ID
router.route('/:id/pay').put(protectedRoute, updateOrderToPaid) // route to update order pay



export default router;