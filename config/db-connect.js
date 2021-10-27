const mongoose = require("mongoose")
require('dotenv').config();


/**Database connect*/
function connectDB() {
    const mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }

    mongoose.connect(process.env.DB_URI, mongooseOptions, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log("Ket noi database thanh cong!");
        }
    })
}

module.exports = connectDB;
