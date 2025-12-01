const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    items: [
        {
            Product: {
                type: mongoose.Schema.Types.ObjectId,  
                ref: 'Product',
                required: true
            },
            size: {type: String, required: true},
            quantity: {type: Number, required: true, min: 1}
    }
]
}, {timestamps: true});

module.exports = mongoose.model('Cart', CartSchema);