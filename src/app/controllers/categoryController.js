const { validationResult } = require('express-validator');
const Category = require('../models/category');

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

const getCategoryAdd = (req, res, next) => {
    res.render('admin/createCategory.ejs');
}

const postCategoryAdd = (req, res, next) => {
    const title = req.body.title;
    const slug = title.replace(/\s+/g, '-').toLowerCase();

    const errors = validationResult(req);
    if (errors.isEmpty()) {
        Category.findOne({ slug: slug })
            .then(cat => {
                if (cat) {
                    req.flash('danger', 'Category slug exists, choose another.');
                    res.render('admin/createCategory.ejs')
                } else {
                    const category = new Category({ title, slug });
                    return category.save()
                        .then(() => {
                            req.flash('success', 'Category added');
                            res.render('admin/createCategory.ejs');
                        });
                }
            })
            .catch(next);
    } else {
        res.render('admin/createCategory.ejs', {
            errors: errors.array()
        });
    }
};

module.exports = {
    getCategorypage,
    getCategoryAdd,
    postCategoryAdd,
}