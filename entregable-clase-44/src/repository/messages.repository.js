const MessageDto = require('../DTOs/message.dto');
const PersistenceFactory = require('../daos/index');
const { PERSISTENCE } = require('../config');

const persistenceFactory = PersistenceFactory.getInstance();

const { messagesDao } = persistenceFactory.getPersistenceMethod(PERSISTENCE);

class MessagesRepo {
    constructor() {
        this.dao = messagesDao;
    }

    async create(newMessage) {
        try {
            const message = await this.dao.create(newMessage);
            const messageDto = new MessageDto(message);
            return messageDto;
        } catch (error) {
            throw new Error('Ocurrio un error al crear un mensajes');
        }
    }

    async getAll() {
        try {
            const messages = await this.dao.readAll();
            return messages.map((message) => {
                const messageDto = new MessageDto(message);
                return messageDto;
            })
        } catch (error) {
            throw new Error('Ocurrio un error al leer todos los mensajes');
        }
    }


}

module.exports = MessagesRepo;