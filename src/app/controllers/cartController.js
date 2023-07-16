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
                    category: product.category,
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
                        category: product.category,
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

//[POST] /update/:id?action
const postCartUpdate = (req, res, next) => {
    const cart = req.session.cart;
    const id = req.params.id;
    const action = req.query.action;

    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            switch (action) {
                case "increment":
                    cart[i].qty++;
                    break;
                case "decrement":
                    cart[i].qty--;
                    if (cart[i].qty < 1)
                        cart.splice(i, 1);
                    break;
                case "delete":
                    cart.splice(i, 1);
                    if (cart.length == 0)
                        delete req.session.cart;
                    break;
                default:
                    console.log('update problem');
                    break;
            }
            break;
        }
    }

    req.flash('success', 'Cart updated!');
    res.redirect('/cart/checkout');
}

// [GET] /cart/delete/:id
const getCartDelete = (req, res, next) => {
    const cart = req.session.cart;
    const id = req.params.id;

    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart.splice(i, 1);
            if (cart.length == 0)
                delete req.session.cart;
        }
    }
    res.redirect('back');
}

// [GET] /cart/clear
const getCartClear = (req, res, next) => {
    delete req.session.cart;

    req.flash('success', 'Thank you for your order. Enjoy your free surprise gift!');
    res.redirect('/cart/checkout');

};

module.exports = {
    getCartAdd,
    getCheckout,
    postCartUpdate,
    getCartDelete,
    getCartClear,
}