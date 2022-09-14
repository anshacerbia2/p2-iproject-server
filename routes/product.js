const ProductController = require('../Controllers/ProductController');

const router = require('express').Router();

router.get('/', ProductController.products);
router.get('/:id', ProductController.product);

module.exports = router;


