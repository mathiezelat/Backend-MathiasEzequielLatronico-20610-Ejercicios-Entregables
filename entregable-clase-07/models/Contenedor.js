const fs = require('fs');

class Contenedor {

    constructor( archivo ) {

        this.archivo = archivo;
        this.productos = this.getAll();
        
    }

    async save( producto ) {

        try {
            
            for (const key in producto) {
                if( !producto[key] ) return { 
                    status: 400,
                    error: `${key} no definida` 
                };
            }

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

            return producto;

        } catch ( error ) {
            console.log('Ocurrio un error al guardado:', error);
        }

    }

    async getById( id ) {

        try{

        const productos = await this.productos;

        const producto = productos.find( producto => producto.id === id );

        if ( !producto ) return { 
            status: 404,
            error: 'producto no encontrado' 
        };

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

    async update( id, productoActualizado ) {

        try{

            const productos = await this.productos;

            const producto = productos.find( producto => producto.id === id );
            if ( !producto ) return { 
                status: 404,
                error: 'producto no encontrado' 
            };

            const productoIndex = productos.indexOf( producto );
            
            const validateAllProp = Object.values( productoActualizado )
                    .every( value => value === undefined );
            if( validateAllProp ) return { 
                status: 400,
                error: 'no se recibio ninguna propiedad para actualizar el producto' 
            };

            for (const key in producto) {
                if(productoActualizado[key]){
                    producto[key] = productoActualizado[key];
                }
            }

            productos[productoIndex] = producto;

            await fs.promises.writeFile( 
                this.archivo,
                JSON.stringify( productos, null, 2 )
            );

            return productos[productoIndex];

        } catch( error ) {
            console.log('Ocurrio un error al encontrar el producto:', error);
        }

    }

    async deleteById( id ) {

        try {
        
        const productos = await this.productos;
        
        const producto = productos.find( producto => producto.id === id );
        if (!producto) return {
            status: 404,
            error: 'el producto que intentas eliminar no existe'
        };
        
        const nuevosProductos = productos.filter( producto => producto.id !== id );
        
        await fs.promises.writeFile( 
            this.archivo,
            JSON.stringify( nuevosProductos, null, 2 )
        );

        return producto;
        
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