const express = require('express');
const router = express.Router();

// ... (existing routes)

// http://localhost:4000/router/products (POST)
router.post('/products', (req, res) => {
    try {
        console.log(req.body);
        // Your logic for handling POST requests to /products
        res.status(201).send({ success: true, message: "Product created successfully", data: req.body });
    } catch (error) {
        next(error);
    }
});

// Wildcard route
router.all('/*', (req, res, next) => {
    try {
        console.log(req.path);
        const err = new Error("Invalid Path");
        err.status = 501;
        throw err;
    } catch (error) {
        next(error);
    }
});

module.exports = router;
