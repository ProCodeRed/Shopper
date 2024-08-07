import asyncHandler from 'express-async-handler'
import User from "../db/models/userModel.js";


// @desc: auth user & get token
// @route: GET /api/users/login
// @access: PUBLIC

export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: null,
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
})
