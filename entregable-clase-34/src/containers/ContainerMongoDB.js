const mongoose = require("mongoose");

const { MONGODB } = require('../config');

class ContainerMongoDB {

    constructor( model ) {
        this.model = model;
        this.init();
    }

    async init(){
        try {
            if(!this.conexion){
                this.conexion = await mongoose.connect(MONGODB.host, MONGODB.options);
            }
        } catch (error) {
            throw new Error('Ocurrio un error inesperado:', error);
        }
    }

    async create(object){
        try {
            const created = await this.model.create(object);
            return created;
        } catch (error) {
            throw new Error('Ocurrio un error inesperado:', error);
        }
    }

    async readAll(){
        try {
            const list = await this.model.find({}).lean();
            
            return list;
        } catch (error) {
            throw new Error('Ocurrio un error inesperado:', error);
        }
    }

    async readByEmail(email){
        try {
            const item = await this.model.find({ email }).lean();
            
            return item;
        } catch (error) {
            throw new Error('Ocurrio un error inesperado:', error);
        }
    }

    async readById(id){
        try {
            const isValid = mongoose.isValidObjectId(id);

            if(!isValid) throw 'id is not valid'

            const item = await this.model.findOne({ _id: id }).lean();

            return item;
        } catch (error) {
            throw new Error('Ocurrio un error inesperado:', error);
        }
    }

    async updateById({id, object}){
        try {
            const isValid = mongoose.isValidObjectId(id);

            if(!isValid) throw 'id is not valid';
            
            const updated = await this.model.updateOne({ _id: id }, { $set: object });

            if(updated.matchedCount === 0) throw 'Error al actualizar'

            const itemUpdated = await this.readById(id);
            return itemUpdated;

        } catch (error) {
            throw new Error('Ocurrio un error inesperado:', error);
        }
    }

    async deleteById(id){
        try {
            const isValid = mongoose.isValidObjectId(id);

            if(!isValid) throw 'id is not valid';
            
            const itemDeleted = await this.readById(id);

            const deleted = await this.model.deleteOne({ _id: id });

            return itemDeleted;
        } catch (error) {
            throw new Error('Ocurrio un error inesperado:', error);
        }
    }

    async deleteAll(){
        try {
            const deleted = await this.model.deleteMany({});
            return deleted;
        } catch (error) {
            throw new Error('Ocurrio un error inesperado:', error);
        }
    }

}

module.exports = ContainerMongoDB;