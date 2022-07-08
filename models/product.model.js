const mongoose = require('mongoose');
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    stock: Number,
    department: String,
    available: Boolean

});

module.exports = mongoose.model('product', productSchema);