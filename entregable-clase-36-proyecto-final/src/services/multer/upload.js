const multer = require('multer');
const { usersDao } = require('../../daos/index');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads');
    },
    filename: function (req, file, cb) {
        const timestamp = Date.now();
        cb(null, timestamp + '-' + file.originalname);
    },
});

const upload = multer({
    storage,
});

module.exports = upload;
