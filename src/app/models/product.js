const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        title: {
            type: String,
            require: true
        },
        slug: {
            type: String,
        },
        desc: {
            type: String,
            require: true
        },
        category: {
            type: String,
            require: true
        },
        price: {
            type: Number,
            require: true
        },
        image: {
            type: String,
        },
    },
    {
        _id: false,
        timestamps: true,
    },
);

module.exports = mongoose.model('Product', ProductSchema);