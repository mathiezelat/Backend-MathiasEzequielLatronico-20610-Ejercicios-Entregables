const logger = require('../logger/winston');
const transporter = require('../services/nodemailer/transporter');
const { NODEMAILER_MAIL } = require('../config');

const sendMail = async (subject, html) => {
    try {
        const options = {
            from: `Servidor Node.js <${NODEMAILER_MAIL}>`,
            to: NODEMAILER_MAIL,
            subject,
            html,
        };

        const info = await transporter.sendMail(options);
        logger.info(info);
    } catch (error) {
        logger.error(error);
    }
};

module.exports = {
    sendMail,
};
