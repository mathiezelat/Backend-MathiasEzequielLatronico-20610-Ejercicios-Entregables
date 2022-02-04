const ContenedorMemoria = require('../../containers/memory.container');

class UsersDaoMemoria extends ContenedorMemoria {
    constructor() {
        super('users');

        this.users = this.data;
    }

    create(user) {
        try {
            for (const key in user) {
                if (!user[key]) {
                    throw {
                        message: `${key} no definida`,
                        status: 400,
                        id,
                        name: 'Ocurrio un error al crear el usuario',
                    };
                }
            }

            const users = this.users;

            if (!users.length) {
                user._id = '1';
            } else {
                user._id = (
                    parseInt(users[users.length - 1]._id) + 1
                ).toString();
            }

            user.timestamp = new Date().toLocaleString();

            users.push(user);

            this.write(users);

            return user;
        } catch (error) {
            throw {
                ...error,
                description: 'Ocurrio un error al crear un nuevo usuario',
            };
        }
    }

    getAll() {
        try {
            return this.read();
        } catch (error) {
            throw {
                ...error,
                description: 'Ocurrio un error al leer los usuarios',
            };
        }
    }

    getById(id) {
        try {
            const users = this.read();

            const user = users.find((user) => user._id === id);

            return user;
        } catch (error) {
            throw {
                ...error,
                description: 'Ocurrio un error al obtener el usuario por email',
            };
        }
    }

    getByEmail(email) {
        try {
            const users = this.read();

            const user = users.find((user) => user.email === email);

            return user;
        } catch (error) {
            throw {
                ...error,
                description: 'Ocurrio un error al obtener el usuario por email',
            };
        }
    }
}

module.exports = UsersDaoMemoria;
