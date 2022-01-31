const { Strategy: LocalStrategy } = require('passport-local');
const validator = require('validator');
const fs = require('fs');
const path = require('path');

const { usersDao } = require('../../daos/index');
const { isValidPassword, createHash } = require('../../utils/bcrypt');

const { sendMail } = require('../../utils/nodemailer');

const logger = require('../../logger/winston');

const loginStrategy = new LocalStrategy(
    {
        usernameField: 'email',
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
        try {
            logger.info(`Login user: ${email}`);

            const user = await usersDao.getByEmail(email);

            if (!user) {
                logger.warn(`User not found with email: ${email}`);
                return done(
                    null,
                    false,
                    req.flash('error', {
                        message: 'User Not Found with Email',
                        auth: 'login',
                    }),
                );
            }

            if (!(await isValidPassword(user, password))) {
                logger.warn(`Invalid user password: ${email}`);
                return done(
                    null,
                    false,
                    req.flash('error', {
                        message: 'Invalid Password',
                        auth: 'login',
                    }),
                );
            }
            logger.info(`Login user: ${email} success`);

            return done(null, user);
        } catch (error) {
            logger.error(`Login error: ${error}`);
            done(error);
        }
    },
);

const signupStrategy = new LocalStrategy(
    {
        usernameField: 'email',
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
        try {
            const { nombre, direccion, edad, telefono } = req.body;

            const { file } = req;

            const foto = `/${file.destination.split('/')[1]}/${file.filename}`;

            logger.info(`Signup user: ${email}`);

            if (!validator.isMobilePhone(telefono, validator.isMobilePhoneLocales)) {
                logger.warn(`Invalid mobile phone: ${telefono}`);

                await fs.promises.unlink(path.join(__dirname + `../../../uploads/${file.filename}`));

                return done(
                    null,
                    false,
                    req.flash('error', {
                        message: 'Invalid mobile phone',
                        auth: 'signup',
                    }),
                );
            }

            const user = await usersDao.getByEmail(email);

            if (user) {
                logger.warn(`User already exists: ${email}`);

                await fs.promises.unlink(path.join(__dirname + `../../../uploads/${file.filename}`));

                return done(
                    null,
                    false,
                    req.flash('error', {
                        message: 'User already exists',
                        auth: 'signup',
                    }),
                );
            }

            const newUser = {
                email,
                password: await createHash(password),
                nombre,
                direccion,
                edad: Number(edad),
                telefono: Number(telefono),
                foto,
            };

            const userWithId = await usersDao.create(newUser);

            sendMail(
                'nuevo registro',
                `<div>
                <p>Nombre: ${userWithId.nombre}</p>
                <p>Edad: ${userWithId.edad}</p>
                <p>Email: ${userWithId.email}</p>
                <p>Dirección: ${userWithId.direccion}</p>
                <p>Telefóno: ${userWithId.telefono}</p>
                <p>UserId: ${userWithId._id}</p>
            </div>`,
            );

            logger.info(`Signup user: ${email} success`);

            return done(null, userWithId);
        } catch (error) {
            logger.error(`Signup error: ${error}`);
            done(error);
        }
    },
);

const serializeUser = (user, done) => {
    done(null, user._id);
};

const deserializeUser = async (id, done) => {
    try {
        const user = await usersDao.getById(id);

        if (!user) {
            logger.error(`Deserialize error: user not found`);
            return done(new Error('User not found'));
        }

        done(null, user);
    } catch (error) {
        logger.error(`Deserialize error: ${error}`);
        done(error);
    }
};

module.exports = {
    loginStrategy,
    signupStrategy,
    serializeUser,
    deserializeUser,
};
