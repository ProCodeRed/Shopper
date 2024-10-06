import express from "express";
import { addOrderItems, getOrderById } from "../controllers/orderControllers.js";
import { protectedRoute } from "../middleware/authMiddleware.js";


const router = express.Router();

router.route('/').post(protectedRoute, addOrderItems) // route to create new order
router.route('/:id').get(protectedRoute, getOrderById) // route to get order by it's ID



export default router;