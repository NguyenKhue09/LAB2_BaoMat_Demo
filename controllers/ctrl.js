const service = require("../services/user.service");
// Controllers

// Get login page
module.exports.loginUser = async (req, res) => {
  if (req.signedCookies.userId || req.signedCookies.adminId) {
    res.redirect("/");
    return;
  }

  res.render("authentication", {
    layout: false,
    csrf: req.csrfToken(),
  });
};

// Post login info
module.exports.postLoginUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  let errors = [];

  if (!email || !password) {
    errors.push("Please fill in all informations");
    res.render("authentication", {
      errors: errors,
      values: req.body,
      layout: false,
      csrf: req.csrfToken(),
    });
    return;
  }

  const user = await service.findOneUser({ email: email });
  console.log(user);
  if (!user) {
    errors.push("User doesn't exist");
  } else if (user.password != password) {
    errors.push("Wrong password!! Please try again");
  }

  if (errors.length != 0) {
    res.render("authentication", {
      errors: errors,
      values: req.body,
      layout: false,
      csrf: req.csrfToken(),
    });
    return;
  }

  res.cookie("userId", user._id, {
    signed: true,
  });

  req.session.user = user;
  res.redirect("/");
};

// Get sign up user
module.exports.signUpUser = async (req, res) => {
  if (res.locals.user || res.locals.admin) {
    delete res.locals.user;
    delete res.locals.admin;
  }

  res.render("registration", {
    showTitle: true,
    layout: false,
    csrf: req.csrfToken(),
  });
};

// Sign up user controller
module.exports.postSignUpUser = async (req, res) => {
  const Userdata = {
    email: req.body.email,
    password: req.body.password,
  };

  const email = req.body.email;
  const password = req.body.password;
  const rePassword = req.body.rePassword;

  let errors = [];

  if (!req.body.email || !req.body.password) {
    errors.push("Please fill in all informations");
    res.render("registration", {
      error: "Error! Please try again",
      layout: false,
      csrf: req.csrfToken(),
    });
    return;
  }

  const registedUser = await service.registerUser(Userdata);
  const user = await service.findOneUser({ email: email });
  if (!registedUser) {
    res.render("registration", {
      error: "Error! Please try again",
      layout: false,
      csrf: req.csrfToken(),
    });
  } else {
    req.session.user = user;
    res.cookie("userId", user._id, {
      signed: true,
    });
    res.redirect("/");
  }
};

module.exports.logout = (req, res) => {
  res.clearCookie("userId");
  delete req.session.user;
  res.redirect("/");
};
