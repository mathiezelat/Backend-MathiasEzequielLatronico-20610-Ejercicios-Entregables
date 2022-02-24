const supertest = require('supertest');
const chai = require('chai');

const request = supertest('http://localhost:8080');
const expect = chai.expect;

describe('test API RESTful', () => {

    let productId;

    it('debería retornar los productos', async () => {
        const response = await request.get('/api/productos');
        expect(response.status).to.eql(200);
        expect(response.body).to.be.a('array');
    });

    it('debería incorporar un producto', async () => {
        const producto = {
            title: 'Esto es un producto de test',
            price: 1500,
            thumbnail:'https://www.int.com.ar/wp-content/uploads/2021/12/categorias_de_producto.png',
        };

        const response = await request.post('/api/productos').send(producto);
        expect(response.status).to.eql(200);
        expect(response.body).to.be.a('object');

        const productoRecibido = response.body;
        expect(productoRecibido).to.include.keys(
            'title',
            'price',
            'thumbnail',
            '_id',
        );

        expect(productoRecibido.title).to.eql(producto.title);
        expect(productoRecibido.price).to.eql(producto.price);
        expect(productoRecibido.thumbnail).to.eql(producto.thumbnail);

        productId = productoRecibido._id;
    });

    it('debería buscar un producto', async () => {
        const response = await request.get(`/api/productos/${productId}`);
        expect(response.status).to.eql(200);
        expect(response.body).to.be.a('object');

        const productoRecibido = response.body;
        expect(productoRecibido).to.include.keys(
            'title',
            'price',
            'thumbnail',
            '_id',
        );
        expect(productoRecibido._id).to.eql(productId);
    });

    it('debería modificar un producto', async () => {
        const producto = {
            price: 8500,
        };

        const response = await request.put(`/api/productos/${productId}`).send(producto);
        expect(response.status).to.eql(200);
        expect(response.body).to.be.a('object');

        const productoRecibido = response.body;
        expect(productoRecibido).to.include.keys(
            'title',
            'price',
            'thumbnail',
            '_id',
        );

        expect(productoRecibido.price).to.eql(producto.price);
        expect(productoRecibido._id).to.eql(productId);
    });

    it('debería borrar un producto', async () => {
        const response = await request.delete(`/api/productos/${productId}`);
        expect(response.status).to.eql(200);
        expect(response.body).to.be.a('object');

        const productoRecibido = response.body;
        expect(productoRecibido).to.include.keys(
            'title',
            'price',
            'thumbnail',
            '_id',
        );

        expect(productoRecibido._id).to.eql(productId);

        const confirm = await request.get(`/api/productos/${productId}`);
        expect(confirm.status).to.eql(404);
    });
});
