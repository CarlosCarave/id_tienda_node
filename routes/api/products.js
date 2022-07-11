const router = require('express').Router();

const Product = require('../../models/product.model');

router.get('/', (req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.json({ error: err.message }));
});

// GET /api/products/:price
// Recuperar todos los productos mayores del precio que recibimos en la URL
router.get('/:price', async (req, res) => {
    const { price } = req.params;

    try {
        const products = await Product.find({
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
});

router.put('/:productId', async (req, res) => {
    const { productId } = req.params;

    const product = await Product.findByIdAndUpdate(productId, req.body, { new: true });

    res.json(product);
});

router.delete('/:productId', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete({_id: productId});
        res.json({
            message: 'El producto se ha borrado',
            product
        });
    } catch (err) {
        res.json({ error: err.message });
    }
});

module.exports = router;