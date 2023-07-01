const product = require("../../app/models/product");

const helper = {
    covertTitle: function (string) {
        return string.length > 23 ? string.slice(0, 23) + '...' : string;
    },
    covertPrice: function (price) {
        return parseFloat(price).toFixed(2);
    },
    costProduct: function (price, quantity) {
        return parseFloat(price * quantity).toFixed(2);
    },
    totalCart: function (products) {
        let total = 0;
        products.forEach(product => total += (product.price * product.qty))
        return parseFloat(total).toFixed(2);
    }
};

module.exports = helper;