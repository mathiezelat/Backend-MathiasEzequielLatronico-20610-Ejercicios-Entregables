const UserDto = require('../DTOs/user.dto');
const PersistenceFactory = require('../daos/index');
const { PERSISTENCE } = require('../config');

const persistenceFactory = PersistenceFactory.getInstance();

const { usersDao } = persistenceFactory.getPersistenceMethod(PERSISTENCE);

class UsersRepo {
    constructor() {
        this.dao = usersDao;
    }

    async create(newUser) {
        try {
            const user = await this.dao.create(newUser);
            const userDto = new UserDto(user);
            return userDto;
        } catch (error) {
            throw new Error('Ocurrio un error al crear un usuario');
        }
    }

    async readByEmail(email) {
        try {
            const [ user ] = await this.dao.readByEmail(email);
            if (!user) return;
            const userDto = new UserDto(user);
            return userDto;
        } catch (error) {
            throw new Error('Ocurrio un error al leer por email un usuario');
        }
    }

    async readById(id) {
        try {
            const user = await this.dao.readById(id);
            if (!user) return;
            const userDto = new UserDto(user);
            return userDto;
        } catch (error) {
            throw new Error('Ocurrio un error al leer por id un usuario');
        }
    }
}

module.exports = UsersRepo;
