import express from "express";
import { addOrderItems } from "../controllers/orderControllers.js";
import { protectedRoute } from "../middleware/authMiddleware.js";


const router = express.Router();

router.route('/').post(protectedRoute, addOrderItems) // route to create new order



export default router;