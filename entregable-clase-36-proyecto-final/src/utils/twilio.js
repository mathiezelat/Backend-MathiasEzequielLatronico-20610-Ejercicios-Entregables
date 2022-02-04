const logger = require('../logger/winston');
const client = require('../services/twilio/client');

const { TWILIO_NUMBER, TWILIO_NUMBER_WSP } = require('../config');

const sendSMS = async (body, to) => {
    try {
        const message = await client.messages.create({
            body: body,
            from: TWILIO_NUMBER,
            to: to,
        });
        logger.info(message);
    } catch (error) {
        logger.error(error);
    }
};

const sendWSP = async (body, to) => {
    try {
        const whatsapp = await client.messages.create({
            body: body,
            from: TWILIO_NUMBER_WSP,
            to: to,
        });
        logger.info(whatsapp);
    } catch (error) {
        logger.error(error);
    }
};

module.exports = {
    sendSMS,
    sendWSP,
};
