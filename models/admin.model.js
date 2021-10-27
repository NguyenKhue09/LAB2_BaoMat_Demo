const mongoose = require('mongoose');


/**Admin model */
const adminSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Please add your email!"],
            unique: true
        },
        password: {
            type: String,
            required: [true, "Please add your password!"]
        }
    },
    { timestamps: true}
)

const Admins = mongoose.model("Admins", adminSchema);

module.exports = Admins;