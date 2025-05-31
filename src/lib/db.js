import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected successfully, ${connect.connection.host}:${connect.connection.port}`);
    }   catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); // Dừng ứng dụng nếu kết nối thất bại
    }
}
