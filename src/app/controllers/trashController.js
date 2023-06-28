const Product = require('../models/product');

const getTrashPage = (req, res, next) => {
    Product.findWithDeleted({ deleted: true })
        .then((products) => {
            res.render('admin/trash.ejs', {
                products: products
            })
        })
        .catch(next);
}


module.exports = {
    getTrashPage,
}