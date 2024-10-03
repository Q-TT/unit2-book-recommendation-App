const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user.js');
const session = require('express-session');


router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('bookapp/index.ejs', {
          books: currentUser.books,
          user: req.session.user,
        });
      } catch (error) {
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
        console.log(error)
        res.redirect('/')
      }
  });

router.post('/new', async(req,res) => {
    try {
        // Look up the user from req.session
        const currentUser = await User.findById(req.session.user._id);
        currentUser.books.push(req.body);
        // Save changes to the user
        await currentUser.save();
        // Redirect back to the applications index view
        res.redirect(`/users/${currentUser._id}/bookapp`);
      } catch (error) {
        // If any errors, log them and redirect back home
        console.log(error);
        res.redirect('/')
      }
})

router.get("/:bookId", async (req,res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const currentBook = currentUser.books.id(req.params.bookId)
        res.render("bookapp/show.ejs", {
            currentBook: currentBook,
        });
        console.log(currentBook, currentUser)
    } catch(error) {
        console.log(error);
        res.redirect('/')
    }
})

module.exports = router;