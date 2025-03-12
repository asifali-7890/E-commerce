import mongoose from 'mongoose';

// Function to connect to the MongoDB database
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, // These options are no longer needed as mongoose uses sensible defaults, but you can add them for older versions
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure if the connection fails
    }
};

export default connectDB;
