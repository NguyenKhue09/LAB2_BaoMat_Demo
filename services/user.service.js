const Users = require('../models/user.model');

/*
* @Function: Find user from db
* @Input: object info contain field of user need to find
* @Outpt: array ducument user if found/ null if not found
 */
async function findOneUser(info) {

    const userFound = await Users.find(info,(err) => {

        if(!err) console.log("Find  user successful!");
        
        else console.log("Find user failed!");
    });

    return userFound;

}

/**
 * @Fucntion: Add user
 * @Input: object data contain all field of user need to add
 * @Output: ducument user add sucess/ null if add fail
 */
 async function registerUser(data) {
    try {

        const newUser = new Users(data);

        const saveUser = await newUser.save();

        if(saveUser) console.log('Register user successful!');       
        else    console.log('Register user unsuccessful!');

        return saveUser;

    } catch (error) {
        
        console.log(error.message)
    }
}

module.exports = {
    findOneUser,
    registerUser
}