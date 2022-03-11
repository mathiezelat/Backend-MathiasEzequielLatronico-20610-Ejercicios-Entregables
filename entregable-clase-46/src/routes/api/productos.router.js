const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('koa-graphql');
const config = require('../../config.js')

const {
    getProductos,
    getProducto,
    createProducto,
    updateProducto,
    deleteProducto,
} = require('../../controllers/api/productos.controller');

const productoSchema = buildSchema(`
    type Producto {
        _id: ID!
        title: String
        price: Int
        thumbnail: String
    }
    input ProductoInput {
        title: String!
        price: Int!
        thumbnail: String!
    }
    type Query {
        getProducto(id: ID!): Producto
        getProductos: [Producto]
    }
    type Mutation {
        createProducto(datos: ProductoInput): Producto
        updateProducto(id: ID!, datos: ProductoInput): Producto
        deleteProducto(id: ID!): Producto
    }
`);

module.exports = graphqlHTTP({
    schema: productoSchema,
    rootValue: {
        getProductos,
        getProducto,
        createProducto,
        updateProducto,
        deleteProducto,
    },
    graphiql: config.GRAPHIQL == 'true',
});