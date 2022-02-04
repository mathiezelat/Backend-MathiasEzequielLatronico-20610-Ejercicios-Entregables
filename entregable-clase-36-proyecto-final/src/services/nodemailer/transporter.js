const { createTransport } = require('nodemailer');
const { NODEMAILER_MAIL, NODEMAILER_MAIL_PASSWORD } = require('../../config');

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: NODEMAILER_MAIL,
        pass: NODEMAILER_MAIL_PASSWORD,
    },
});

module.exports = transporter
