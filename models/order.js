const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    tableNum: {type: Number, required: true},
    order: {type: String, required: true},
    subtotal: {type: String, required: true},
    total: {type: String, required: true},
    status: {type: String, required: true}
}, {timestamps: true});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;