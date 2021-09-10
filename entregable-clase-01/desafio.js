class Usuario{
    constructor( nombre, apellido, libros, mascotas ){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){
        return `${ this.nombre } ${ this.apellido }`;
    }

    addMascota( nombreDeMascota ){
        this.mascotas.push( nombreDeMascota );
    }

    countMascotas(){
        return this.mascotas.length;
    }

    addBook( nombre, autor ){
        this.libros.push( { nombre, autor } );
    }

    getBookNames(){
        return this.libros.map( libro => libro.nombre );
    }

}

const usuario1 = new Usuario( 
    'Elon', 
    'Musk', 
    [ 
        { nombre: 'El señor de las moscas', autor: 'William Golding' }, 
        { nombre: 'Fundacion', autor: 'Isaac Asimov' }, 
    ],
    [ 'Copernico', 'Einstein' ],
);


usuario1.addBook( 'La última pregunta', 'Isaac Asimov' );

console.log( usuario1.getBookNames() );

usuario1.addMascota( 'Newton' );

console.log( usuario1.countMascotas() );

console.log( usuario1.getFullName() );