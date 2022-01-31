const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
    direccion: {
        type: String,
        required: [true, 'La dirección es obligatoria'],
    },
    edad: { type: Number, required: [true, 'La edad es obligatoria'] },
    telefono: {
        type: Number,
        required: [true, 'El número de teléfono es obligatorio'],
    },
    foto: { type: String, required: [true, 'La foto es obligatoria'] },
});

module.exports = model('User', UserSchema);
