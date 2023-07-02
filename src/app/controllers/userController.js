const { validationResult } = require('express-validator');
const passport = require('passport');
const bcrypt = require('bcrypt');

const User = require('../models/user');

//[GET] /categories
const getCategorypage = (req, res) => {
    Category.find({})
        .then(categories => {
            res.render('admin/category.ejs', {
                categories: categories
            });
        })
        .catch(err => {
            console.log(err);
        });
}



module.exports = {
    getCategorypage,
}