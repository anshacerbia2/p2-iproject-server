const ProductController = require('../Controllers/ProductController');

const router = require('express').Router();

router.get('/', ProductController.get)

module.exports = router;


