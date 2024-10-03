////////////////////////
//* Setup - Import deps and create app object
////////////////////////
//impirt used libraries
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const morgan = require("morgan");
const methodOverride = require("method-override");
const session = require('express-session');
const bcrypt = require('bcrypt');

const isSignedIn = require('./middleware/is-sign-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');


//import dataSchema
const User = require('./models/user.js');
const authController = require('./controllers/auth.js');
const bookappController = require("./controllers/bookapp.js")

//set up PORT 3000
const port = process.env.PORT ? process.env.PORT : "3000";

//set up mongoose database
mongoose.connect(process.env.MONGODB_URI);

//test if it connect to the right database
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});



//////////////////////
//* Declare Middleware
//////////////////////
// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
// Morgan for logging HTTP requests
app.use(morgan('dev'));
// Session allows the creation and storage of the session data used for authentication or user preferences. 
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);

app.use(passUserToView);

//use controller js to maager /auth router
app.use('/auth', authController);
app.use(isSignedIn);
app.use('/users/:userId/bookapp', bookappController);


///////////////////////
// Declare Routes and Routers 
///////////////////////
// INDUCES - Index, New, Delete, Update, Create, Edit, Show
app.get("/", (req, res) => {
  res.render("index.ejs", {
    user: req.session.user,
  });
});


///////////////////////////
// Server Listener
///////////////////////////
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
