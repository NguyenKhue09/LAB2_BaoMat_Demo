const mongoose = require('mongoose');


/**User model */
const userSchema = new mongoose.Schema(
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

const Users = mongoose.model("Users", userSchema);

module.exports = Users;