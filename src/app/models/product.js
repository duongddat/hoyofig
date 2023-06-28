const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
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
        timestamps: true,
    },
);

//Add plugin
ProductSchema.plugin(mongooseDelete, { deletedBy: true, deletedByType: String, overrideMethods: 'all' });

module.exports = mongoose.model('Product', ProductSchema);