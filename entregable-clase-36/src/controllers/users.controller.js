const { usersDao } = require('../daos/index');

const usersGet = async (req, res, nex) => {
    try {
        const users = await usersDao.getAll();

        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    usersGet,
};
