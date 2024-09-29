import express from "express";
import {authUser, getUserProfile} from "../controllers/usersControllers.js";
import { protectedRoute } from "../middleware/authMiddleware.js";


const router = express.Router();

router.route('/login').post(authUser)
router.route('/profile').get(protectedRoute, getUserProfile)

export default router; 