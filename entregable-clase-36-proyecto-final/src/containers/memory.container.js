const DB = {};

class ContenedorMemoria {
    constructor(memoria) {
        this.database = DB;
        this.collection = memoria;
        this.data = [];
    }

    write(data) {
        try {
            this.database[this.collection] = data;
            return data;
        } catch (error) {
            throw {
                ...error,
                name: 'Ocurrio un error al guardar en memoria',
                description: 'Error al guardar información en memoria',
            };
        }
    }

    read() {
        try {
            const data = this.database[this.collection];
            if (!data) return [];
            return data;
        } catch (error) {
            throw {
                ...error,
                name: 'Ocurrio un error al leer en memoria',
                description: 'Error al obtener información en memoria',
            };
        }
    }
}

module.exports = ContenedorMemoria;
