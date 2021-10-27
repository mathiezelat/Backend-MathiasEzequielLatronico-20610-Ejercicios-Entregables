const fs = require('fs');

const Productos = require('./Productos');

const miProductos = new Productos('productos.json');

class Carrito {

    constructor( archivo ) {

        this.archivo = archivo;
        this.carritos = this.getAllCarritos();
        this.productos = miProductos.getAll();

    }

    async createCarrito() {

        try {

        const carritos = await this.carritos;

        const carrito = {
            id: 0,
            timestamp: new Date().toLocaleString(),
            productos: []
        };

        if ( !carritos.length ) {
            carrito.id = 1;
        } else {
            carrito.id = carritos[carritos.length - 1].id + 1;
        }

        carritos.push( carrito );

        await fs.promises.writeFile( 
            this.archivo,
            JSON.stringify( carritos, null, 2 )
        );

        return carrito;
        } catch ( error ) {
            throw new Error( 'Ocurrio un error al crear un nuevo carrito:', error );
        }
    }

    async getAllCarritos() {
        try{

            if( !fs.existsSync( this.archivo ) ) return [];
            
            const contenido = await fs.promises.readFile(
                this.archivo,
                'utf-8'
            );

            if ( !contenido ) return [];

            const carritos = JSON.parse( contenido );

            return carritos;
            
        } catch ( error ) {
            throw new Error( 'Ocurrio un error al leer los carritos:', error );
        }
    }

    async getCarritoProductos( id ) {
        try {

            const carritos = await this.carritos;

            const carrito = carritos.find( carrito => carrito.id === id );

            if ( !carrito ) return { 
                status: 404,
                error: 'carrito no encontrado' 
            };;

            return carrito.productos;

        } catch ( error ) {
            throw new Error( 'Ocurrio un error al obtener un carrito:', error );
        }
    }

    async deleteCarrito( id ) {
        try {

            const carritos = await this.carritos;

            const carrito = carritos.find( carrito => carrito.id === id );

            if ( !carrito ) return { 
                status: 404,
                error: 'carrito no encontrado' 
            };;

            carritos.splice( carritos.indexOf( carrito ), 1 );

            await fs.promises.writeFile(
                this.archivo,
                JSON.stringify( carritos, null, 2 )
            );

            return carrito;

        } catch ( error ) {
            throw new Error( 'Ocurrio un error al borrar un carrito:', error );
        }
    }

    async addProducto( id, productoId ) {
        try {

            const carritos = await this.carritos;

            const productos = await this.productos;

            const carrito = carritos.find( carrito => carrito.id === id );

            if ( !carrito ) return { 
                status: 404,
                error: 'carrito no encontrado' 
            };

            const producto = productos.find( producto => producto.id === productoId );

            if ( !producto ) return {
                status: 404,
                error: 'producto no encontrado'
            }

            carrito.productos.push( producto );

            await fs.promises.writeFile(
                this.archivo,
                JSON.stringify( carritos, null, 2 )
            );

            return carrito;
        } catch ( error ) {
            throw new Error( 'Ocurrio un error al agregar un producto:', error );
        }
    }

    async deleteProducto( id, productoId ) {
        try {

            const carritos = await this.carritos;

            const carrito = carritos.find( carrito => carrito.id === id );

            if ( !carrito ) return {
                status: 404,
                error: 'carrito no encontrado'
            }

            const producto = carrito.productos.find( producto => producto.id === productoId );

            if(!producto) return {
                status: 404,
                error: 'producto no encontrado'
            }

            carrito.productos.splice( carrito.productos.indexOf( producto ), 1 );

            await fs.promises.writeFile(
                this.archivo,
                JSON.stringify( carritos, null, 2 )
            )

            return carrito;
        } catch ( error ) {
            throw new Error( 'Ocurrio un error al borrar un producto:', error );
        }
    }

}

module.exports = Carrito;
