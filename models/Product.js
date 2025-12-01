const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    price: {type: Number, required: true},
    category: {type:String, required: true},
    imageUrl: {type: String, required: true},
    sizes: { type: [String], default: [] },
    stock: { type: Number, default: 0 }
}, {timestamps: true});


const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;