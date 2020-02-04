const express = require('express');
const router = express.Router();

const Product = require('../model/product');
const auth = require('../middleware/auth');

router.get('/', async(req, res) => {
    res.json({ msg: "Connected to API" })
})

router.get('/all', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (err) {
        res.send({ msg: "Error fetching products" })
    }
});

router.get('/:name', auth, async (req, res) => {
    try {
        const product = await Product.findOne();
        res.json(product);
    } catch (e) {
        res.send({ msg: "Error in fetching product" });
    }
})

router.post('/create', auth, async (req, res) => {
    const {
        name,
        description,
        price,
        imageURL
    } = req.body;

    try {
        let product = await Product.findOne({
            name
        });

        if (product) {
            return res.status(400).json({
                msg: "Product already added. Try another name"
            });
        }

        product = new Product({
            name,
            description,
            price,
            imageURL
        });

        await product.save();
    } catch(err) {
        console.log(err.message);
        res.status(500).send("Error Saving");
    }
})

router.patch('/:id', async (req, res) => {
    try {
        if (req.body.name != null) {
            res.product.name = req.body.name
        }

        if (req.body.description != null) {
            res.product.description = req.body.description
        }

        if (req.body.price != null) {
            res.product.price = req.body.price
        }

        if (req.body.imageURL != null) {
            res.product.imageURL = req.body.imageURL
        }

        try {
            const updatedProduct = await res.product.save();
            res.json(updatedProduct)
        } catch {
            res.status(400).json({ msg: err.message })
        }
    } catch (err) {
        res.json(err);
    }
})

module.exports = router;