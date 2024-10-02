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



///////////////////////
// Declare Routes and Routers 
///////////////////////
// INDUCES - Index, New, Delete, Update, Create, Edit, Show







///////////////////////////
// Server Listener
///////////////////////////
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
