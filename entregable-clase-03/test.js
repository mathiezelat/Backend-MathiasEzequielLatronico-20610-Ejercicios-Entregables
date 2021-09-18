const Contenedor = require('./Contenedor.js');

const miContenedor = new Contenedor('productos.json');


const main = async () => {

    try {

        await miContenedor.save({ 
            title: 'Mundo', 
            price: 2000, 
            thumbnail: 'Imagen de Mundo'
        });
        
        await miContenedor.deleteAll();

        await miContenedor.save({ 
            title: 'Hola Mundo', 
            price: 2700, 
            thumbnail: 'Imagen de Hola Mundo'
        });

        await miContenedor.save({ 
            title: 'Tierra', 
            price: 700, 
            thumbnail: 'Imagen de Tierra'
        });

        const productoSolicitado = await miContenedor.getById(1);

        console.log( productoSolicitado );

        await miContenedor.deleteById(1);

        const productos = await miContenedor.getAll();

        console.log( productos );

    } catch ( error ) {
        console.log( 'Ocurrio un error inesperado:', error );
    }

}

main();