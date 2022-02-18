const ProductosMongoDB = require('./productos/ProductosMongoDB');
const MessagesMongoDB = require('./messages/MessagesMongoDB');
const UsersMongoDB = require('./users/UsersMongoDB');

class PersistenceFactory {
    getPersistenceMethod(persistence) {
        switch (persistence) {
            case 'mongo':
            default:
                return {
                    productosDao: new ProductosMongoDB(),
                    messagesDao: new MessagesMongoDB(),
                    usersDao: new UsersMongoDB(),
                };
        }
    }

    static getInstance() {
        if (!PersistenceFactory.instance) {
            PersistenceFactory.instance = new PersistenceFactory();
        }
        return PersistenceFactory.instance;
    }
}

module.exports = PersistenceFactory;
