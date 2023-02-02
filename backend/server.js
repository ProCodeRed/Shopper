import express from 'express'
import dotenv from 'dotenv'
import products from './data/products.js'
import connectDB from './db/config/db.js';

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT
const MODE = process.env.NODE_ENV

app.get('/', (req, res) => {
    res.send('Api is running...')
})

app.get('/api/products', (req, res) => {
    res.json(products)
})

app.get('/api/products/:id', (req, res) => {
    const product = products.find(product => product._id === req.params.id)
    res.json(product)
})

app.listen(PORT, console.log(`The server is running on ${PORT} at ${MODE} mode`))