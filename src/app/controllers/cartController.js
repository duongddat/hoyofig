const Product = require('../models/product');

const getCartAdd = (req, res, next) => {
    const slug = req.params.product;
    res.json(req.body);
}


module.exports = {
    getCartAdd,
}