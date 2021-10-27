const Admins = require('../models/user.model');

/*
* @Function: Find user from db
* @Input: object info contain field of user need to find
* @Outpt: array ducument user if found/ null if not found
 */
async function findOneAdmin(info) {

    const adminFound = await Admins.find(info,(err) => {

        if(!err) console.log("Find  admin successful!");
        
        else console.log("Find admin failed!");
    });

    return adminFound;

}

/**
 * @Fucntion: Add user
 * @Input: object data contain all field of user need to add
 * @Output: ducument user add sucess/ null if add fail
 */
 async function registerAdmin(data) {
    try {

        const newAdmin = new Admins(data);

        const saveAdmin = await newAdmin.save();

        if(saveAdmin) console.log('Register admin successful!');       
        else    console.log('Register admin unsuccessful!');

        return saveAdmin;

    } catch (error) {
        
        console.log(error.message)
    }
}

module.exports = {
    findOneAdmin,
    registerAdmin
}