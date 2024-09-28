import mongoose from "mongoose";
import dotenv from 'dotenv'
import users from "./data/user.js";
import products from "./data/products.js";
import Product from "./db/models/productModel.js";
import User from "./db/models/userModel.js";
import Order from "./db/models/orderModel.js";
import connectDB from "./db/config/db.js";
import { exit } from "process";

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0]._id;
        const sampleProducts = products.map(product => {
            return {
                ...product, user:adminUser
            }
        })

        await Product.insertMany(sampleProducts)
        console.log(`Data imported successfully...`)
        exit()

    } catch (error) {
       console.log(`Error:  ${error.message}`)
       exit(1)
    }
}
const deleteData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        console.log(`Data deleted successfully...`)
        exit()

    } catch (error) {
       console.log(`Error:  ${error.message}`)
       exit(1)
    }
}

process.argv[2] === '-d' ? deleteData() : importData();