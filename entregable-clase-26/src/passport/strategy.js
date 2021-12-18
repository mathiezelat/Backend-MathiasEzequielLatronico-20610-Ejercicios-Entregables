// const { Strategy: LocalStrategy } = require('passport-local');

// const { UsersDao } = require('../daos/index');
// const { isValidPassword, createHash } = require('../utils/bcrypt');

// const myUsers = new UsersDao();


// const loginStrategy = new LocalStrategy(async (email, password, done ) => {
//     try {
//         console.log({email})
//         console.log({password})

//         const user = await myUsers.readByEmail(email);

//         if(!user) {
//             console.log('User Not Found with username', username);
//             return done(null, false, { message: 'User Not Found with username' });
//         }

//         const isValid = await isValidPassword(user, password) ;

//         if( !isValid ) {
//             console.log('Invalid Password');
//             return done(null, false, { message: 'Invalid Password' });
//         }

//         return done(null, user);
//     } catch (error) {
//         done(error);
//     }
// })

// const singupStrategy = new LocalStrategy({ 
//     passReqToCallback: true
// },
// async (req, email, password, done ) => {
//     try {
//         const user = await myUsers.readByEmail(email);

//         if(user) {
//             console.log('User alredy exists', { message: 'User already exists' });
//             return done(null, false);
//         }

//         const newUser = {
//             email,
//             password: await createHash(password)
//         }

//         const userWithId = await myUsers.create(newUser);

//         console.log({ userWithId })
//         console.log('User Registration succesful');

//         return done(null, userWithId);
//     } catch (error) {
//         done(error);
//     }
// });

// const serialize = (user, done) => {
//     done(null, user._id)
// }

// const deserialize = async (id, done) => {
//     try {
//         const user = await myUsers.readById(id);

//         if (!user) {
//             return done(new Error('usuario no encontrado'));
//         }

//         done(null, user);
//     } catch (error) {
//         done(error);
//     }
// }

// module.exports = {
//     loginStrategy,
//     singupStrategy,
//     serialize,
//     deserialize
// }