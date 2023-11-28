const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect(
        '<Connection String>',
        {}
    );
    console.log(`Mongo db Connected ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB