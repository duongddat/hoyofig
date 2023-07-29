const Category = require('../models/category');
const Product = require('../models/product');

const helper = require('../../services/helpers/helper.js');

//[GET] /
const getHomepage = (req, res, next) => {
    const getCategory = Category.find({});
    const getProduct = Product.find({});

    //Pagination
    const page = parseInt(req.query.page) || 1; // n
    const perPage = 8; //x


    const start = (page - 1) * perPage;
    const end = page * perPage;

    Promise.all([getCategory, getProduct])
        .then(([categories, products]) => {
            const size = Math.ceil(products.length / perPage);
            res.render('home.ejs', {
                categories,
                products: products.slice(start, end),
                size,
                helper
            });
        })
        .catch(next);
}

//[GET] /:category
const getProductsOfCategory = (req, res, next) => {
    const getCategory = Category.find({});
    const getProduct = Product.find({ category: req.params.category });

    //Pagination
    const page = parseInt(req.query.page) || 1; // n
    const perPage = 8; //x


    const start = (page - 1) * perPage;
    const end = page * perPage;

    Promise.all([getCategory, getProduct])
        .then(([categories, products]) => {
            const size = Math.ceil(products.length / perPage);
            res.render('home.ejs', {
                categories,
                products: products.slice(start, end),
                size,
                helper
            });
        })
        .catch(next);

}

//[GET] /:category/:id
const getDetailProduct = (req, res, next) => {
    Product.findById(req.params.id)
        .then(product => {
            res.render('productDetail.ejs', {
                product,
                helper
            })
        })
        .catch(next);
}


const getAboutUspage = (req, res) => {
    res.render('aboutUs.ejs');
}

const getContactpage = (req, res) => {
    res.render('contactUs.ejs');
}

module.exports = {
    getHomepage,
    getProductsOfCategory,
    getDetailProduct,
    getAboutUspage,
    getContactpage,
}