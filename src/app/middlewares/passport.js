const LocalStategy = require('passport-local');
const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = function (passport) {
    passport.use(new LocalStategy((username, password, done) => {
        User.findOne({ username: username })
            .then(user => {
                if (!user) {
                    return done(null, false, { message: 'No user found' });
                }
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Wrong password.' });
                        }
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id)
            .then(function (user) {
                done(null, user);
            })
            .catch(function (err) {
                done(err, null);
            });
    });
}