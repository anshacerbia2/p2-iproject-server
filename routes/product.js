const router = require('express').Router();
const ProductController = require('../controllers/ProductController');

router.get('/', ProductController.products);
router.get('/:id', ProductController.product);

module.exports = router;


