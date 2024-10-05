import express from "express";
import {authUser, getUserProfile, registerUser, updateUserProfile} from "../controllers/usersControllers.js";
import { protectedRoute } from "../middleware/authMiddleware.js";


const router = express.Router();

router.route('/').post(registerUser)
router.route('/login').post(authUser)
router.route('/profile').get(protectedRoute, getUserProfile).put(protectedRoute, updateUserProfile)

export default router; 