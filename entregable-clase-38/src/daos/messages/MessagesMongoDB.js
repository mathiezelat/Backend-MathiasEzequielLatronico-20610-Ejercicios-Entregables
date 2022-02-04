const ContainerMongoDB = require('../../containers/ContainerMongoDB');

const Message = require('../../models/message');

class MessagesMongoDB extends ContainerMongoDB{

    constructor(){
        super(Message);
    }

}

module.exports = MessagesMongoDB;