const router = require('express').Router();
const userRoutes = require('./user');
const productRoutes = require('./product');
const categoryRoutes = require('./category');
const errorHandler = require('../middlewares/errorHandler');
const MidtransController = require('../Controllers/MidtransController');

router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use(userRoutes);
router.post('/charge', MidtransController.charge);
router.post('/notifikasi', MidtransController.notification);
router.use(errorHandler);

module.exports = router;