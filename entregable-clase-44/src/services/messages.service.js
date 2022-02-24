const MessagesRepo = require('../repository/messages.repository');

const messageApi = new MessagesRepo();

const createMessage = async (message) => {
    try {
        return await messageApi.create(message);
    } catch (error) {
        throw new Error('Ocurrio un error al crear un mensaje');
    }
};

const readAllMessages = async () => {
    try {
        return await messageApi.getAll();
    } catch (error) {
        throw new Error('Ocurrio un error al leer todos los mensajes');
    }
};

module.exports = {
    createMessage,
    readAllMessages,
};
