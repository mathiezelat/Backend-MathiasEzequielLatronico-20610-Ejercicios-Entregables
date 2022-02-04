const fs = require('fs');

class ContenedorArchivo {
    constructor(archivo) {
        this.archivo = archivo;
    }

    async writeFile(data) {
        try {
            await fs.promises.writeFile(
                this.archivo,
                JSON.stringify(data, null, 2),
            );
        } catch (error) {
            throw {
                ...error,
                name: 'Ocurrio un error al guardar el archivo',
                description: 'Error al guardar información del archivo',
            };
        }
    }

    async readFile() {
        try {
            if (!fs.existsSync(this.archivo)) return [];

            const contenido = await fs.promises.readFile(this.archivo, 'utf-8');

            if (!contenido) return [];

            const data = JSON.parse(contenido);

            return data;
        } catch (error) {
            throw {
                ...error,
                name: 'Ocurrio un error al leer el archivo',
                description: 'Error al obtener información del archivo',
            };
        }
    }
}

module.exports = ContenedorArchivo;
