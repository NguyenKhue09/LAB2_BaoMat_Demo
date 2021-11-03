module.exports.requireUser =  async (req, res, next) => {
    //console.log(req.signedCookies.adminId);
    if (!req.signedCookies.userId) {
        res.redirect('/login');
        return;
    }
    
    next();
};