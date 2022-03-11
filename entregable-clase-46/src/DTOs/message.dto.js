class MessageDto {
    constructor(message) {
        this._id = message._id;
        this.author = message.author;
        this.text = message.text;
        this.date = message.date;
    }
}

module.exports = MessageDto;
