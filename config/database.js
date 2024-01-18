const mongoose = require('mongoose');

require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (err) {
        console.log("Error connecting to the database: ", err)
    }
}

module.exports = connectDB;