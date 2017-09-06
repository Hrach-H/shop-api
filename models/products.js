const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const patcher = require('mongoose-json-patch');

const ProductSchema = new Schema({
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

ProductSchema.plugin(patcher);

const Products = mongoose.model('product', ProductSchema);

module.exports = Products;