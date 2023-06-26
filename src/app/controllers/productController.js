const { validationResult } = require('express-validator');

const Category = require('../models/category');
const Product = require('../models/product');
const product = require('../models/product');

const getProductpage = (req, res) => {
    res.render('home.ejs');
}

const getProductAdd = (req, res, next) => {
    Category.find({})
        .then(categories => {
            res.render('admin/createProduct.ejs', {
                categories: categories
            });
        })
        .catch(next);
}

const postProductAdd = (req, res, next) => {
    const title = req.body.title;
    const slug = title.replace(/\s+/g, '-').toLowerCase();
    const desc = req.body.desc;
    const price = req.body.price;
    const category = req.body.category;
    const image = req.file ? req.file.filename : "";

    const errors = validationResult(req);
    if (errors.isEmpty()) {
        Product.findOne({ slug: slug })
            .then((product) => {
                if (product) {
                    req.flash('danger', 'Product title exists, choose another.');
                    Category.find({})
                        .then((categories) => {
                            res.render('admin/add_product.ejs', {
                                categories: categories
                            });
                        })
                } else {
                    const price2 = parseFloat(price).toFixed(2);
                    const product = new Product({
                        title: title,
                        slug: slug,
                        desc: desc,
                        price: price2,
                        category: category,
                        image: image
                    });
                    return product.save()
                        .then(() => res.redirect('back'))
                        .catch(next);

                }
            })
            .catch(next);

    } else {
        return Category.find({})
            .then(categories => {
                res.render('admin/createProduct.ejs', {
                    errors: errors.array(),
                    categories: categories
                });
            })
            .catch(next);
    }
}

module.exports = {
    getProductpage,
    getProductAdd,
    postProductAdd,
}