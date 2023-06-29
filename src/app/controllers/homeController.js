const Category = require('../models/category');
const Product = require('../models/product');

const helper = require('../../services/helpers/helper.js');

//[GET] /
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

//[GET] /:category
const getProductsOfCategory = (req, res, next) => {
    const getCategory = Category.find({});
    const getProduct = Product.find({ category: req.params.category });

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

const getDetailProduct = (req, res, next) => {
    res.json(req.params);
}


const getAboutUspage = (req, res) => {
    res.send('About page');
}

const getContactpage = (req, res) => {
    res.send('Contact page');
}

module.exports = {
    getHomepage,
    getProductsOfCategory,
    getDetailProduct,
    getAboutUspage,
    getContactpage,
}