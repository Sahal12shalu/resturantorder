import mongoose from 'mongoose'

let isConnected;

export const dbConnect = async () => {
    if(isConnected) return;

    try {
        const db = await mongoose.connect(process.env.MONGO_URL)

        isConnected = db.connections[0].readyState;
        console.log('mongodb connected')
    }catch (error) {
        console.error('connection error')
        throw error
    }
}