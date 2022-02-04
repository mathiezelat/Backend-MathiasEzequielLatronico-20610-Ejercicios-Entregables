const mongoose = require('mongoose');
const { MONGODB_CNN } = require('../config');

class ContenedorMongoDB {
    constructor(model) {
        this.model = model;
        this.init();
    }

    async init() {
        try {
            if (!this.conexion) {
                this.conexion = await mongoose.connect(MONGODB_CNN, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                });
            }
        } catch (error) {
            throw {
                ...error,
                name: 'Ocurrio un error al conectar',
                description:
                    'Error al establecer una conexión con la base de datos',
            };
        }
    }

    async create(object) {
        try {
            const created = await this.model.create(object);
            return created;
        } catch (error) {
            throw {
                ...error,
                name: 'Ocurrio un error al crear',
                description: 'Error al crear información en la base de datos',
            };
        }
    }

    async getAll() {
        try {
            const list = await this.model.find({});

            return list;
        } catch (error) {
            throw {
                ...error,
                name: 'Ocurrio un error al obtener',
                description: 'Error al obtener información de la base de datos',
            };
        }
    }

    async getById(id) {
        try {
            const validate = mongoose.isValidObjectId(id);

            if (!validate) {
                throw {
                    message: 'El id no es válido',
                    status: 400,
                    id,
                };
            }

            const item = await this.model.findById(id);

            if (!item) {
                throw {
                    message: 'No encontrado',
                    status: 404,
                    id,
                };
            }

            return item;
        } catch (error) {
            throw {
                ...error,
                name: 'Ocurrio un error al obtener por id',
                description: 'Error al obtener información de la base de datos',
            };
        }
    }

    async getByEmail(email) {
        try {
            const item = await this.model.findOne({ email });

            return item;
        } catch (error) {
            throw {
                ...error,
                name: 'Ocurrio un error al obtener por email',
                description: 'Error al obtener información de la base de datos',
            };
        }
    }

    async getAllById(ids) {
        try {
            for (const id of ids) {
                const validate = mongoose.isValidObjectId(id);

                if (!validate) {
                    throw {
                        message: 'El id no es válido',
                        status: 400,
                        id,
                    };
                }
            }

            const records = await this.model.find({ _id: { $in: ids } });

            return records;
        } catch (error) {
            throw {
                ...error,
                name: 'Ocurrio un error al obtener todos por id',
                description: 'Error al obtener información de la base de datos',
            };
        }
    }
    async getByUserId(userId) {
        try {
            const validate = mongoose.isValidObjectId(userId);

            if (!validate) {
                throw {
                    message: 'El id no es válido',
                    status: 400,
                    userId,
                };
            }

            const records = await this.model.find({ userId, order: false });

            return records;
        } catch (error) {
            throw {
                ...error,
                name: 'Ocurrio un error al obtener por ir de usuario',
                description: 'Error al obtener información de la base de datos',
            };
        }
    }

    async update(id, elements) {
        try {
            const validate = mongoose.isValidObjectId(id);
            if (!validate) {
                throw {
                    message: 'El id no es válido',
                    status: 400,
                    id,
                };
            }

            const item = await this.model.findByIdAndUpdate(id, elements);
            if (!item) {
                throw {
                    message: 'No encontrado',
                    status: 404,
                    id,
                };
            }

            return item;
        } catch (error) {
            throw {
                ...error,
                name: 'Ocurrio un error al actualizar',
                description:
                    'Error al actualizar información de la base de datos',
            };
        }
    }

    async deleteById(id) {
        try {
            const validate = mongoose.isValidObjectId(id);
            if (!validate) {
                throw {
                    message: 'El id no es válido',
                    status: 400,
                    id,
                };
            }

            const itemDeleted = await this.model.findByIdAndDelete(id);

            if (!itemDeleted) {
                throw {
                    message: 'No encontrado',
                    status: 404,
                    id,
                };
            }

            return itemDeleted;
        } catch (error) {
            throw {
                ...error,
                name: 'Ocurrio un error al borrar por id',
                description: 'Error al borrar información de la base de datos',
            };
        }
    }

    async deleteAll() {
        try {
            const items = await this.model.deleteMany({});
            return items;
        } catch (error) {
            throw {
                ...error,
                name: 'Ocurrio un error al borrar todos',
                description: 'Error al borrar información de la base de datos',
            };
        }
    }
}

module.exports = ContenedorMongoDB;
