const fs = require('fs');

class Contenedor {

    constructor( archivo ) {

        this.archivo = archivo;
        this.productos = this.getAll();
        
    }

    async save( producto ) {

        try {

        const productos = await this.productos;
        
        if ( !productos.length ) {
            console.log(productos.length)
            producto.id = 1;
        } else {
            producto.id = productos[productos.length - 1].id + 1;
        }
        
        productos.push( producto );
            

            await fs.promises.writeFile( 
                this.archivo,
                JSON.stringify( productos, null, 2 )
            );

            return producto.id;

        } catch ( error ) {
            console.log('Ocurrio un error al guardado:', error);
        }

    }

    async getById( id ) {

        try{

        const productos = await this.productos;

        const producto = productos.find( producto => producto.id === id );

        if ( !producto ) return null;

        return producto;

        } catch( error ) {
            console.log('Ocurrio un error al encontrar el producto:', error);
        }

    }

    async getAll() {
        
        try{

            if( !fs.existsSync( this.archivo ) ) return [];
            
            const contenido = await fs.promises.readFile(
                this.archivo,
                'utf-8'
            );

            if ( !contenido ) return [];

            const data = JSON.parse( contenido );

            return data;
            
        } catch ( error ) {
            console.log('Ocurrio un error al leer:', error)
        }

    }

    async deleteById( id ) {

        try {
        
        const productos = await this.productos;
        
        const nuevosProductos = productos.filter( producto => producto.id !== id );
        
        
        await fs.promises.writeFile( 
            this.archivo,
            JSON.stringify( nuevosProductos, null, 2 )
        );

        } catch ( error ) {
            console.log('Ocurrio un error al eliminar el producto:', error);
        }

    }

    async deleteAll() {

        try{

        this.productos = [];

        await fs.promises.writeFile( 
            this.archivo,
            JSON.stringify( this.productos, null, 2 )
        );

        } catch ( error ) {
            console.log('Ocurrio un error al eliminar todos los productos:', error);
        }

    }

}

module.exports = Contenedor;