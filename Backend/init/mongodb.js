const mongoose = require('mongoose');
const { connectionUrl } = require('../configs/keys');

const connectMongo = async() => {
    try {
        await mongoose.connect(connectionUrl);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = connectMongo;