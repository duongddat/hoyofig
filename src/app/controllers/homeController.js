const Category = require('../models/category');
const Product = require('../models/product');

const helper = require('../../services/helpers/helper.js');

const getHomepage = (req, res, next) => {
    const getCategory = Category.find({});
    const getProduct = Product.find({});

    Promise.all([getCategory, getProduct])
        .then(([categories, products]) => {
            res.render('home.ejs', {
                categories,
                products,
                helper
            });
        })
        .catch(next);
}

const getAboutUspage = (req, res) => {
    res.send('About page');
}

const getContactpage = (req, res) => {
    res.send('Contact page');
}

module.exports = {
    getHomepage,
    getAboutUspage,
    getContactpage,
}