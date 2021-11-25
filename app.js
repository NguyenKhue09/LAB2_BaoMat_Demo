const express = require("express");
const app = express();
const port = process.env.PORT || 1050;
const connectDB = require("./config/db-connect");
var exphbs = require("express-handlebars");

//static
app.use(express.static("public"));
// Libraries
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
var csurf = require("csurf");
const mongoSanitize = require('express-mongo-sanitize');

// Services
const postService = require("./services/post.service");
const notifyService = require("./services/notify.service");

// Middlewares
const authMiddleware = require("./Middlewares/authentication.middleware");

// Routes
const loginRoute = require("./routes/login.route");
const signUpRoute = require("./routes/signup.route");
const postRoute = require("./routes/post.route");
const logoutRoute = require("./routes/logout.route");
// ConnectDB
connectDB();

// Handlebars
var hbs = exphbs.create({
  // Specify helpers which are only registered on this instance.
  helpers: {
    foo: function () {
      return "FOO!";
    },
    bar: function () {
      return "BAR!";
    },
  },
});

require("dotenv").config(); // to use .env file
app.set("view engine", "pug");
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", "./views"); // view
app.use(cookieParser(process.env.SECRET_COOKIES));
app.use(csurf({ cookie: true }));
app.use(
  mongoSanitize({
    replaceWith: '_',
  }),
);

app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: parseInt(process.env.SESSION_TIMEOUT) || 60000000 },
  })
);

app.get("/", authMiddleware.requireUser, async (req, res) => {
  let page = req.query.page;

  if (page <= 0 || !page) {
    page = 1;
  }

  const allPosts = await postService.getPostByPage(page);
  const allPages = await postService.getNumberOfPost();

  const userId = req.signedCookies.userId;
  const notify = await notifyService.GetNotifyNotRead(userId);
  // console.log(notify);

  res.render("home", {
    user: res.locals.user,
    posts: allPosts,
    allPages: allPages,
    currentPage: page,
    notify: notify,
    showTitle: true,
    layout: false,
    csrf: req.csrfToken(),
  });
});

// app.use();
app.use("/login", loginRoute);
app.use("/signup", signUpRoute);
app.use("/post", postRoute);
app.use("/logout", logoutRoute);
const { getPostByPage } = require("./services/post.service");
app.listen(port, async () => {
  // check if the website is runnig
  // const post = await getPostByPage(1);
  // console.log(post);
  // const search = await postService.searchPosts("hy vo");
  // console.log("search:", search);
  console.log(`The app is listening at port ${port}`);
});
