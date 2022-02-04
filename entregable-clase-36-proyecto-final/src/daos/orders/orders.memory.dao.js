const ContenedorMemoria = require('../../containers/memory.container');

class OrdersDaoMemoria extends ContenedorMemoria {
    constructor() {
        super('orders');

        this.orders = this.data;
    }

    create(order) {
        try {
            for (const key in order) {
                if (!order[key]) {
                    throw {
                        message: `${key} no definida`,
                        status: 400,
                        name: 'Ocurrio un error al crear la orden',
                    };
                }
            }

            const orders = this.orders;

            if (!orders.length) {
                order._id = '1';
            } else {
                order._id = (
                    parseInt(orders[orders.length - 1]._id) + 1
                ).toString();
            }

            order.timestamp = new Date().toLocaleString();

            orders.push(order);

            this.write(orders);

            return order;
        } catch (error) {
            throw {
                ...error,
                description: 'Ocurrio un error al crear una nueva orden',
            };
        }
    }

    getAll() {
        try {
            return this.read();
        } catch (error) {
            throw {
                ...error,
                description: 'Ocurrio un error al leer las ordenes',
            };
        }
    }
}

module.exports = OrdersDaoMemoria;
