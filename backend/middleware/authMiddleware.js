import jwt from 'jsonwebtoken'
import expressAsyncHandler from "express-async-handler";
import User from '../db/models/userModel.js';


export const protectedRoute = expressAsyncHandler (async (req, res, next) => {

 let token ;

 if(req.headers.authorization && req.headers.authorization.startsWith('Berear')){
    try {
        token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        console.log("decoded", decodedToken)
        req.user = await User.findById(decodedToken.id).select('-password')
        next()
    } catch (error) {
        console.log(error)
        res.status(401)
        throw new Error("Not Authorized, token has been failed");
        
    }
 }
 if(!token){
    res.status(401)
    throw new Error("Not authorize");
    
 }

})