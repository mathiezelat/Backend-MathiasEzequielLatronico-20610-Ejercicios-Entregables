const Joi = require('joi');

const validarProducto = (producto) => {
    const ProductoSchema = Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required(),
        thumbnail: Joi.string().required(),
    });

    const { value, error } = ProductoSchema.validate(producto);

    if (error) return { error };

    return { value };
};

module.exports = {
    validarProducto,
};
