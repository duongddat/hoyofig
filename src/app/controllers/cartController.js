const Product = require('../models/product');
const helper = require('../../services/helpers/helper.js');


//[GET] & [POST] /cart/add/:id
const getCartAdd = (req, res, next) => {
    const quantity = req.body.quantity ? parseInt(req.body.quantity) : 1;
    const id = req.params.id;

    Product.findById(id)
        .then((product) => {
            if (typeof req.session.cart == "undefined") {
                req.session.cart = [];
                req.session.cart.push({
                    id: id,
                    title: product.title,
                    qty: quantity,
                    price: product.price,
                    image: '/img/' + product.image
                });
            } else {
                var cart = req.session.cart;
                var newItem = true;

                for (var i = 0; i < cart.length; i++) {
                    if (cart[i].id == id) {
                        cart[i].qty = parseInt(cart[i].qty) + quantity;
                        newItem = false;
                        break;
                    }
                }

                if (newItem) {
                    cart.push({
                        id: id,
                        title: product.title,
                        qty: quantity,
                        price: product.price,
                        image: '/img/' + product.image
                    });
                }
            }
            // console.log(req.session.cart);
            res.redirect('back');
        })
        .catch(next);
}

//[GET] /cart/checkout
const getCheckout = (req, res, next) => {
    if (req.session.cart && req.session.cart.length == 0) {
        delete req.session.cart;
        res.redirect('/cart/checkout');
    } else {
        res.render('checkOut.ejs', {
            cart: req.session.cart,
            helper: helper
        });
    }
}

module.exports = {
    getCartAdd,
    getCheckout,
}