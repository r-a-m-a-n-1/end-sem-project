const mongoose = require("mongoose");
require("dotenv").config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
    } catch (error) {
        console.log("MONGO DB Failed.");
        throw error
    }
}

module.exports = {connect}