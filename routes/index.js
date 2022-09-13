const router = require('express').Router();
const userRoutes = require('./user');
const productRoutes = require('./product');
const categoryRoutes = require('./category');
const errorHandler = require('../middlewares/errorHandler');

router.use(userRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use(errorHandler);

module.exports = router;