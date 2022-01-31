const ContenedorArchivo = require('../../containers/archive.container');

class OrdersDaoArchivo extends ContenedorArchivo {
    constructor() {
        super('DB/orders.json');

        this.orders = this.readFile();
    }

    async create(order) {
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

            const orders = await this.orders;

            if (!orders.length) {
                order._id = '1';
            } else {
                order._id = (
                    parseInt(orders[orders.length - 1]._id) + 1
                ).toString();
            }

            order.timestamp = new Date().toLocaleString();

            orders.push(order);

            await this.writeFile(orders);

            return order;
        } catch (error) {
            throw {
                ...error,
                description: 'Ocurrio un error al crear una nueva orden',
            };
        }
    }

    async getAll() {
        try {
            return await this.readFile();
        } catch (error) {
            throw {
                ...error,
                description: 'Ocurrio un error al leer las ordenes',
            };
        }
    }
}

module.exports = OrdersDaoArchivo;
