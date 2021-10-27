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

// Sign up user 
module.exports.signUpUser = (req, res) => {
    if(res.locals.user || res.locals.admin) {
        delete res.locals.user;
        delete res.locals.admin;
    };

    res.render('registration');
}

// Sign up user controller 
module.exports.postSignUpUser = (req, res) => {
    const Userdata = {
        email: req.body.email,
        password: req.body.password
    };
}