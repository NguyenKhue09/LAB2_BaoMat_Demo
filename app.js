const express = require("express");
const app = express();
const port = 1050;
const connectDB = require("./config/db-connect");

//static
app.use(express.static("public"));
// Libraries
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const session = require("express-session");

// Services
const postService = require("./services/post.service");

// Middlewares
const authMiddleware = require('./Middlewares/authentication.middleware');

// Routes
const loginRoute = require("./routes/login.route");
const signUpRoute = require("./routes/signup.route");

// ConnectDB
connectDB();

require("dotenv").config(); // to use .env file
app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set("views", "./views"); // view
app.use(cookieParser(process.env.SECRET_COOKIES));
app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: parseInt(process.env.SESSION_TIMEOUT) || 60000000 },
  })
);


app.get("/", async (req, res) => {
    const allPosts = await postService.getAllPost();

    res.render("index", {
    user: res.locals.user,
    posts: allPosts,
  });
});

//app.use(authMiddleware.requireUser);
app.use("/login", loginRoute);
app.use("/signup", signUpRoute);

app.listen(port, () => {
  // check if the website is runnig
  console.log(`The app is listening at port ${port}`);
});
