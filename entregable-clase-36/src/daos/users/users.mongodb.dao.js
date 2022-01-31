const ContenedorMongoDB = require('../../containers/mongodb.container');

const User = require('../../models/user');

class UsersDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(User);
    }
}

module.exports = UsersDaoMongoDB;
