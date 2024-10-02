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

//import dataSchema
const User = require('./models/user.js');

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


///////////////////////
// Declare Routes and Routers 
///////////////////////
// INDUCES - Index, New, Delete, Update, Create, Edit, Show
app.get("/", (req,res)=>{
    res.render('index.ejs')
})

app.get("/auth/sign-in", (req,res) => {
    res.render("auth/sign-in.ejs")
})

app.get("/auth/sign-up", (req,res) => {
    res.render("auth/sign-up.ejs")
})

app.get("/auth/sign-up", (req,res) => {
    res.render("auth/sign-up.ejs")
})


app.post("/auth/sign-up", async (req,res) => {
    try {
        const userExist = await User.findOne({ username: req.body.username });
        
        if (userExist) {
          return res.send('Username already taken, please try another one.');
        }

        if (req.body.password !== req.body.confirmPassword) {
          return res.send('Password and Confirm Password must match');
        }
      
        //Hash the password before sending to the database
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashedPassword;
      
        // All ready to create the new user!
        await User.create(req.body);
      
        res.redirect('/auth/sign-in');

      } catch (error) {
        console.log(error);
        res.redirect('/');
      }
})



///////////////////////////
// Server Listener
///////////////////////////
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
