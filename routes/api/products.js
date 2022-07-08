const router = require('express').Router();

const Product = require('../../models/product.model');

router.get('/', (req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.json({ error: err.message }));
});

// GET /api/products/:price
//Recuperar todos los productos mayores del precio que recibimos en la URL
router.get('/:price', async (req, res) => {
    const { price } = req.params;

    try {
        const products = await product.find({
            price: { $gt: price }
        });
        res.json(products);
    } catch (err) {
        res.json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }


    describe('PUT /api/products/:productId', () => {
        beforeEach(async () => {
            await Product.create({ name: 'Lápiz azul', price: 12, description: 'lapiz de prueba', stock: 20, available: true });
            response = await request(app).put(`/api/products/${productToEdit._id}`).send({
                price: 45, stock: 200});
        });

        afterEach(async () => {
            await Product.findByIdAndDelete(productToEdit._id);
        });
    });

    router.put('/:productId', async (req, res) => {
        const {productId} = req.params;

        const product = await Product.findByIdAndUpdate(productId, req.body, { new: true});

        res.json(product);
    });

});


module.exports = router;