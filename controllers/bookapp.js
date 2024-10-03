const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user.js');
const session = require('express-session');


router.get('/', async (req, res) => {
    try {
        res.render('bookapp/index.ejs', {
          books: req.session.user.books,
          user: req.session.user,
        });
      } catch (error) {
        // If any errors, log them and redirect back home
        console.log(error)
        res.redirect('/')
      }
  });

router.get('/new', async (req, res) => {
    try {
        res.render('bookapp/new.ejs', {
          books: req.session.user.books,
          user: req.session.user,
        });
      } catch (error) {
        // If any errors, log them and redirect back home
        console.log(error)
        res.redirect('/')
      }
  });


module.exports = router;