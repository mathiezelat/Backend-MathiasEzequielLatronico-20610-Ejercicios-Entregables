const { Schema, model } = require('mongoose');

const OrderSchema = new Schema({
    user: { type: Object, required: true },
    cart: { type: Object, required: true },
    timestamp: { type: Date, default: Date.now },
});

module.exports = model('Order', OrderSchema);
