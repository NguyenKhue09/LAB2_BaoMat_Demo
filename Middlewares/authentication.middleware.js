const userService = require('../services/user.service');

module.exports.requireUser =  async (req, res, next) => {
    //console.log(req.signedCookies.adminId);
    if (!req.signedCookies.userId) {
        res.redirect('/login');
        return;
    }

    const user = await userService.findOneUser({_id: req.signedCookies.userId});
    
    if (!user) {
        res.redirect('/login');
        return;
    }

    res.locals.user = user;
    
    next();
};