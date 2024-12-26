const mongoose = require('mongoose');

// mongoose connection 
async function createdConnection(){
    try {
        const { MONGODB_DBNAME, MONGODB_URI } = process.env;
        await mongoose.connect(MONGODB_URI, {
            dbName: MONGODB_DBNAME
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1);
    }
}

module.exports = createdConnection;