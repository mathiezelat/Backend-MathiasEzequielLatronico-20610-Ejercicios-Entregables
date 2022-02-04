const { Schema, model } = require('mongoose');

const CartSchema = new Schema({
    userId: { type: String, required: true },
    productos: { type: Array, required: true, default: [] },
    timestamp: { type: Date, default: Date.now },
    order: { type: Boolean, default: false },
});

module.exports = model('Cart', CartSchema);
