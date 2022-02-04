const ContenedorArchive = require('../../containers/archive.container');

class UsersDaoArchive extends ContenedorArchive {
    constructor() {
        super('DB/users.json');

        this.users = this.readFile();
    }

    async create(user) {
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

            const users = await this.users;

            if (!users.length) {
                user._id = '1';
            } else {
                user._id = (
                    parseInt(users[users.length - 1]._id) + 1
                ).toString();
            }

            user.timestamp = new Date().toLocaleString();

            users.push(user);

            await this.writeFile(users);

            return user;
        } catch (error) {
            throw {
                ...error,
                description: 'Ocurrio un error al crear un nuevo usuario',
            };
        }
    }

    async getAll() {
        try {
            return await this.readFile();
        } catch (error) {
            throw {
                ...error,
                description: 'Ocurrio un error al leer los usuarios',
            };
        }
    }

    async getById(id) {
        try {
            const users = await this.readFile();

            const user = users.find((user) => user._id === id);

            return user;
        } catch (error) {
            throw {
                ...error,
                description: 'Ocurrio un error al obtener el usuario por email',
            };
        }
    }

    async getByEmail(email) {
        try {
            const users = await this.readFile();

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

module.exports = UsersDaoArchive;
