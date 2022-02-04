const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    foto: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    codigo: { type: Number, required: true, default: 0 },
    timestamp: { type: Date, default: Date.now },
});

module.exports = model('Product', ProductSchema);
