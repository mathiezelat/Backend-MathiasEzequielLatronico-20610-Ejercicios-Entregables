require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 8080,
    MODE_SERVER: process.env.MODE_SERVER || 'fork',
    ADMIN: process.env.ADMIN || 'false',
    STORAGE_TYPE: process.env.STORAGE || 'memoria',
    MONGODB_CNN: process.env.MONGODB_CNN || '',
    SECRET_SESSION: process.env.SECRET_SESSION || 'secreto',
    NODEMAILER_MAIL: process.env.NODEMAILER_MAIL || '',
    NODEMAILER_MAIL_PASSWORD: process.env.NODEMAILER_MAIL_PASSWORD || '',
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || '',
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || '',
    TWILIO_NUMBER: process.env.TWILIO_NUMBER || '',
    TWILIO_NUMBER_WSP: process.env.TWILIO_NUMBER_WSP || '',
    TWILIO_NUMBER_USER_ADMIN: process.env.TWILIO_NUMBER_USER_ADMIN || '',
    TWILIO_NUMBER_USER_ADMIN_WSP: process.env.TWILIO_NUMBER_USER_ADMIN_WSP || '',
};
