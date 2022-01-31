const { carritoDao } = require('../daos/index');
const { ordersDao } = require('../daos/index');

const { sendMail } = require('../utils/nodemailer');
const { sendWSP } = require('../utils/twilio');

const { TWILIO_NUMBER_USER_ADMIN_WSP } = require('../config');

const ordersGet = async (req, res) => {
    try {
        const orders = await ordersDao.getAll();

        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};

const ordersPost = async (req, res, next) => {
    try {
        const { user, cart } = req.body;

        const [sendOrder, cartUpdateOrder] = await Promise.all([
            ordersDao.create({ user, cart }),
            carritoDao.update(cart._id, { order: true }),
        ]);

        const subject = `nuevo pedido de ${user.nombre} ${user.email}`;

        let body = '<div>';
        body += '<h1>Productos:</h1>';

        cart.productos.forEach((product, index) => {
            body += `<div>
                <p>Producto ${index}</p>
                <p>nombre: ${product.nombre}</p>
                <p>descripción: ${product.descripcion}</p>
                <p>precio: ${product.precio}</p>
                <p>id: ${product._id}</p>
            </div>`;
        });

        body += '</div>';

        sendMail(subject, body);

        sendWSP(subject, TWILIO_NUMBER_USER_ADMIN_WSP);

        res.status(200).json({ sendOrder, cartUpdateOrder });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    ordersGet,
    ordersPost,
};
