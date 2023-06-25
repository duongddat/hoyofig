const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        title: {
            type: String,
            require: true
        },
        slug: {
            type: String,
            slug: 'title',
            unique: true
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

// Add plugins
mongoose.plugin(slug);

module.exports = mongoose.model('Product', ProductSchema);