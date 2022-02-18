const UsersRepo = require('../repository/users.repository');

const usersApi = new UsersRepo();

const createUser = async (message) => {
    try {
        return await usersApi.create(message);
    } catch (error) {
        throw new Error('Ocurrio un error al crear un usuario');
    }
};

const readUserById = async (id) => {
    try {
        return await usersApi.readById(id);
    } catch (error) {
        throw new Error('Ocurrio un error al leer por id un usuario');
    }
};

const readUserByEmail = async (email) => {
    try {
        return await usersApi.readByEmail(email);
    } catch (error) {
        throw new Error('Ocurrio un error al leer por email un usuario');
    }
};

module.exports = {
    createUser,
    readUserById,
    readUserByEmail,
};
