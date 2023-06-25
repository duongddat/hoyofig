import mongoose from 'mongoose';
const slug = require('mongoose-slug-generator');
const Schema = mongoose;

const CategorySchema = new Schema({
    title: {
        type: String,
        require: true
    },
    slug: {
        type: String,
        slug: 'title',
        unique: true
    }
});

// Add plugins
mongoose.plugin(slug);

module.exports = mongoose.model('Category', CategorySchema);