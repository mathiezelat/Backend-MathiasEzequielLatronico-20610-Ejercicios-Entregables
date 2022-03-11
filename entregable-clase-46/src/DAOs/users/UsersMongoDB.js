const ContainerMongoDB = require('../../containers/ContainerMongoDB');

const User = require('../../models/user');

class UsersMongoDB extends ContainerMongoDB{

    constructor(){
        super(User);
    }

}

module.exports = UsersMongoDB;