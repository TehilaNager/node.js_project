const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const mode = process.env.NODE_ENV;
        const uri = mode === "production" ? process.env.MONGO_URL_PROD : process.env.MONGO_URL_DEV;
        console.log("Successfully connected to database")
        return await mongoose.connect(uri)
    } catch (err) {
        console.log("Connection failed to database", err);
        throw err
    }
};


module.exports = connectDB