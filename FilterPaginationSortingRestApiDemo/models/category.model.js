const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    slug: {
        type: String
    },
    name: {
        type: String
    }
},
    {
        timestamps: true
    });

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;