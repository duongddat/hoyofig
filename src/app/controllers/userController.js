const { validationResult } = require('express-validator');
const passport = require('passport');
const bcrypt = require('bcrypt');

const User = require('../models/user');

//[GET] /user/register
const getRegisterPage = (req, res, next) => {
    res.render('user/register.ejs');
}

//[POST] /user/register
const postRegisterUser = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('user/register.ejs', {
            errors: errors.array(),
            user: null,
        });
    }
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username: username })
        .then((user) => {
            if (user) {
                req.flash('danger', 'Username exists, choose another!');
                return res.redirect('/users/register');
            } else {
                bcrypt.genSalt(10)
                    .then((salt) => bcrypt.hash(password, salt))
                    .then((hashedPassword) => {
                        const newUser = new User({
                            email: email,
                            username: username,
                            password: hashedPassword,
                            admin: 0
                        });

                        newUser.save()
                            .then(() => {
                                req.flash('success', 'You are now registered!');
                                res.redirect('/user/login');
                            })
                    })
                    .catch(next);
            }
        })
        .catch(next);
}

//[GET] /user/login
const getLoginPage = (req, res, next) => {
    if (res.locals.user) res.redirect('/');
    res.render('user/login.ejs');
}



module.exports = {
    getRegisterPage,
    postRegisterUser,
    getLoginPage,
}