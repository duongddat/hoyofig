const { validationResult } = require('express-validator');
const Category = require('../models/category');

//[GET] /categories
const getCategorypage = (req, res) => {
    Category.find({})
        .then(categories => {
            res.render('admin/category.ejs', {
                categories: categories,
                user: req.user
            });
        })
        .catch(err => {
            console.log(err);
        });
}

//[GET] /categories/add-category
const getCategoryAdd = (req, res, next) => {
    res.render('admin/createCategory.ejs', {
        user: req.user
    });
}

//[POST] /categories/add-category
const postCategoryAdd = (req, res, next) => {
    const title = req.body.title;
    const slug = title.replace(/\s+/g, '-').toLowerCase();

    const errors = validationResult(req);
    if (errors.isEmpty()) {
        Category.findOne({ slug: slug })
            .then(cat => {
                if (cat) {
                    req.flash('danger', 'Category slug exists, choose another.');
                    res.render('admin/createCategory.ejs', {
                        user: req.user
                    });
                } else {
                    const category = new Category({ title, slug });
                    return category.save()
                        .then(() => {
                            req.flash('success', 'Category added');
                            res.render('admin/createCategory.ejs', {
                                user: req.user
                            });
                        });
                }
            })
            .catch(next);
    } else {
        res.render('admin/createCategory.ejs', {
            errors: errors.array(),
            user: req.user
        });
    }
};

//[GET] /categories/edit-category/:_id
const getCategoryEdit = (req, res, next) => {
    Category.findById(req.params.id)
        .then(category => {
            res.render('admin/editCategory.ejs', {
                id: category._id,
                title: category.title,
                user: req.user
            });
        })
        .catch(next);
};

//[PUT] /categories/edit-category/:_id
const putCategoryEdit = (req, res, next) => {
    const title = req.body.title;
    const slug = title.replace(/\s+/g, '-').toLowerCase();
    const id = req.params.id;

    const errors = validationResult(req);
    if (errors.isEmpty()) {
        Category.findOne({ slug: slug })
            .then(cat => {
                if (cat) {
                    req.flash('danger', 'Category slug exists, choose another.');
                    res.render('admin/editCategory.ejs', {
                        id: id,
                        title: title,
                        user: req.user
                    });
                } else {
                    return Category.updateOne({ _id: req.params.id },
                        {
                            title: title,
                            slug: slug
                        })
                        .then(() => {
                            req.flash('success', 'Category edited');
                            res.render('admin/editCategory.ejs', {
                                id: id,
                                title: title,
                                slug: slug,
                                user: req.user
                            });
                        });
                }
            })
            .catch(next);
    } else {
        res.render('admin/editCategory.ejs', {
            errors: errors.array(),
            id: id,
            title: title,
            slug: slug,
            user: req.user
        });
    }
};

//[DELETE] /categories/delete-category/:id
const deleteCategory = (req, res, next) => {
    Category.deleteOne({ _id: req.params.id })
        .then(() => {
            res.redirect('back');
        })
        .catch(next);
};

module.exports = {
    getCategorypage,
    getCategoryAdd,
    postCategoryAdd,
    getCategoryEdit,
    putCategoryEdit,
    deleteCategory,
}