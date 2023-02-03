import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/config/db.js';
import productRouter from './routes/productRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT
const MODE = process.env.NODE_ENV

app.get('/', (req, res) => {
    res.send('Api is running...')
})

// to get all products
app.use('/api/products', productRouter)

// 404 not found 
app.use(notFound)

// custom error middleware
app.use(errorHandler)



app.listen(PORT, console.log(`The server is running on ${PORT} at ${MODE} mode`))