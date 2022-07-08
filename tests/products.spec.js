const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose')
const Product = require('../models/product.model')
// agrupar todas las pruebas de los productos
describe('Product Tests', () => {

    //Antes de lanzar cualquier prueba lanzo:
    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/tienda_online')
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    describe('GET /api/products', () => {

        let response;
        beforeEach(async () => {
            response = await request(app).get('/api/products').send();
        });

        it('deberia de volver una respuesta correcta', () => {
            expect(response.statusCode).toBe(200);
        });

        it('deberia devolver un objeto en formato json', () => {

            expect(response.headers['content-type']).toContain('json');
        });

        it('deberia devolver un array', () => {
            expect(response.body).toBeInstanceOf(Array);
        });

    });



    describe('POST /api/products', () => {
        /* antes de cada prueba, realizar la peticion de tipo POST sobre /api/products.
        -Probamos, si la respuesta devuelve,status 201.
        -Probamos, si la respuesta viene en formato JSON.
        -Probamos, si en el cuerpo de la respuesta viene definida la propiedad _id.

         */
        const newProduct = { name: 'Lápiz verde', description: 'Pinta muy bien,pero solo verde', department: 'test', stock: 100, available: true, prince: 5 };
        let response;
        beforeEach(async () => {
            response = await request(app).post('/api/products').send(newProduct)
        });

        afterAll(async () => {
            Product.deleteMany({ department: 'test' })
        });

        it('debería devolver el estado correcto', () => {
            expect(response.statusCode).toBe(201);
        });

        it('deberia devolver datos en formato json', () => {
            expect(response.headers['content-type']).toContain('json');
        });

        it('debería devolverme el objeto producto correcto', () => {
            expect(response.body._id).toBeDefined();
            expect(response.body.name).toEqual(newProduct.name);
        })

        describe('PUT /api/products/:productId', () => {

            let response;
            let productToEdit;
            beforeEach(async () => {
                productToEdit = await Product.create({ name: 'Lápiz azul', price: 12, description: 'Lápiz de prueba', stock: 20, available: true });

                response = await request(app).put(`/api/products/${productToEdit._id}`).send({ price: 45, stock: 200 });
            });

            afterEach(async () => {
                await Product.findByIdAndDelete(productToEdit._id);
            });

            it('debería devolver una respuesta correcta', () => {
                expect(response.statusCode).toBe(200);
            });

            it('debería devolver un objeto en formato json', () => {
                expect(response.headers['content-type']).toContain('json');
            });

            it('El objeto devuelto debe contener los atributos editados', () => {
                expect(response.body.price).toBe(45);
                expect(response.body.stock).toBe(200);
            });

        });
    });

});