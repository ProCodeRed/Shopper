import express from "express";
import {authUser} from "../controllers/usersControllers.js";


const router = express.Router();

router.route('/login').post(authUser)

export default router; 