const mongoose = require('mongoose');

const Product = require('./models/product.model');

mongoose.connect('mongodb://127.0.0.1:27017/tienda_online');

//Crear productos

(async () => {

   /* const product = await Product.create({
        name: 'Bandana de Naruto',
        description: 'To hokage pisha',
        price: 100,
        stock: 200,
        department: 'ninjutsu',
        available: true
    });

    console.log(product) */

    //Recuperar documentos

    const products = await Product.find({
        department: 'cocina',
        price: {$gt: 500}
    });
    console.log(products);

    await mongoose.disconnect();
})();