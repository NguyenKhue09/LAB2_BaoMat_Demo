const service = require('../services/service');
// Controllers

// Get login page
module.exports.loginUser = (req, res) => {
    if(req.signedCookies.userId || req.signedCookies.adminId) {
        res.redirect('/');
        return;
    };

    res.render('login');
}

// Post login info
module.exports.postLoginUser = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = service.findOneUser({email: email});

    let errors = [];

    if (!user) {
        errors.push("User doesn't exist");
    } else if (user.password != password) {
        errors.push("Wrong password!! Please try again");
    }

    if (error.length != 0 ) {
        res.render('login', {
            errors: errors, 
            values: req.body
        })
    }

    res.cookie('userId', user._id, {
        signed: true
    });

    req.session.user = user;
    res.redirect('/');

}