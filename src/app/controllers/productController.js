const fs = require('fs');
const { validationResult } = require('express-validator');

const Category = require('../models/category');
const Product = require('../models/product');

//[GET] /admin/products
const getProductpage = (req, res, next) => {
    const productFind = Product.find({});
    const countDelete = Product.countDocumentsWithDeleted({ deleted: true });

    Promise.all([productFind, countDelete])
        .then(([products, count]) => {
            res.render('admin/product.ejs', {
                products: products,
                count: count,
            });
        })
        .catch(next);
}

//[GET] /admin/products/add-product
const getProductAdd = (req, res, next) => {
    Category.find({})
        .then(categories => {
            res.render('admin/createProduct.ejs', {
                categories: categories
            });
        })
        .catch(next);
}

//[POST] /admin/products/add-product
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
                            res.render('admin/createProduct.ejs', {
                                categories: categories,
                                user: req.user
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
                        .then(() => res.redirect('/admin/products'))
                        .catch(next);

                }
            })
            .catch(next);

    } else {
        return Category.find({})
            .then(categories => {
                res.render('admin/createProduct.ejs', {
                    errors: errors.array(),
                    categories: categories,
                    user: req.user
                });
            })
            .catch(next);
    }
}

//[GET] /admin/products/edit-product/:id
const getPorductEdit = (req, res, next) => {
    const category = Category.find({})
    const product = Product.findById(req.params.id);

    Promise.all([category, product])
        .then(([cat, p]) => {
            res.render('admin/editProduct.ejs', {
                id: p._id,
                title: p.title,
                desc: p.desc,
                categories: cat,
                category: p.category,
                price: parseFloat(p.price).toFixed(2),
                image: p.image,
            })
        })
        .catch(next);

}

//[POST] /admin/products/edit-product/:id
const putProductEdit = (req, res, next) => {
    const id = req.params.id;
    const title = req.body.title;
    const slug = title.replace(/\s+/g, '-').toLowerCase();
    const desc = req.body.desc;
    const category = req.body.category;
    const price = req.body.price;
    const currentImage = req.body.currentImage;
    const image = req.file ? req.file.filename : "";
    let newImage = "";

    const errors = validationResult(req);
    if (errors.isEmpty()) {
        Product.findOne({ slug: slug, _id: { $ne: id } })
            .then((product) => {
                if (product) {
                    req.flash('danger', 'Product title exists, choose another.');
                    res.redirect('/admin/products/edit-product/' + id);
                } else {
                    if (image !== "") {
                        newImage = image;
                        try {
                            fs.unlinkSync("./src/public/img/" + currentImage);
                        } catch (errors) {
                            console.log(errors);
                        }
                    } else {
                        newImage = currentImage;
                    }

                    Product.updateOne({ _id: req.params.id }, {
                        title: title,
                        slug: slug,
                        desc: desc,
                        category: category,
                        price: price,
                        image: newImage
                    })
                        .then(() => {
                            res.redirect('/admin/products');
                        })
                        .catch(next);
                }
            })
            .catch(next);
    } else {
        Category.find({})
            .then(categories => {
                res.render('admin/editProduct.ejs', {
                    errors: errors.array(),
                    id: id,
                    title: title,
                    slug: slug,
                    desc: desc,
                    category: category,
                    categories: categories,
                    price: price,
                    image: currentImage,
                    user: req.user,
                });
            })
            .catch(next);
    }
}



//[DELETE] /admin/products/delete-product/:id
const deleteProductDestroy = (req, res, next) => {
    Product.delete({ _id: req.params.id })
        .then(() => res.redirect('back'))
        .catch(next);
}

//[DELETE] /admin/trash/delete-product/:id
const deleteProductTrash = (req, res, next) => {
    const productFind = Product.findById(req.params.id);
    const productDeleteOne = Product.deleteOne({ _id: req.params.id });

    Promise.all([productFind, productDeleteOne])
        .then(([product, deleteProduct]) => {
            if (product.image !== '') {
                try {
                    fs.unlinkSync("./src/public/img/" + product.image);
                } catch (error) {
                    console.log(error);
                }
            }
            res.redirect('back');
        })
        .catch(next);
}

//[PATCH] /admin/trash/restore-product/:id
const patchProductRestore = (req, res, next) => {
    Product.restore({ _id: req.params.id })
        .then(() => res.redirect('back'))
        .catch(next);
}


module.exports = {
    getProductpage,
    getProductAdd,
    postProductAdd,
    getPorductEdit,
    putProductEdit,
    deleteProductDestroy,
    deleteProductTrash,
    patchProductRestore,
}