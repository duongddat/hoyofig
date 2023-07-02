const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const {
    getRegisterPage,
    postRegisterUser,
    getLoginPage
} = require('../app/controllers/userController');

//router.Method('/route', handle)
router.get('/register', getRegisterPage);
router.post('/register',
    body('email').isEmail().withMessage('Valid email is required!'),
    body('username').notEmpty().withMessage('Username is required!'),
    body('password').notEmpty().withMessage('Password is required!'),
    body('password2').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match!');
        }
        return true;
    }), postRegisterUser);
router.get('/login', getLoginPage);

module.exports = router; //export default 