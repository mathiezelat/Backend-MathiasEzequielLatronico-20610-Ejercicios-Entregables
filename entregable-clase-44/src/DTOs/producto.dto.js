class ProductoDto {
    constructor(producto){
        this._id = producto._id;
        this.title = producto.title;
        this.price = producto.price;
        this.thumbnail = producto.thumbnail;
    }
}

module.exports = ProductoDto;