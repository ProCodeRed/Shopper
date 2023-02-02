import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const dbConnection = await mongoose.connect(process.env.MONGODB_URI) 

        console.log(`MongoDB is now connected: ${dbConnection.connection.host}`)
    } catch (error) {
       console.log(`Error: ${error.message}`) 
       process.exit(1)
    }
}

export default connectDB