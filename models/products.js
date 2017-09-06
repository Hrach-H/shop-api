const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    id: {
        type: Number,
        required: [true, 'ID required']
    },
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    price: {
        type: Number,
        required: [true, 'Price field is required']
    },
    availableQuantity: {
        type: Number
    },
    description: {
        type: String
    },
    url: {
        type: String
    }
});

const Products = mongoose.model('product', ProductSchema);

module.exports = Products;