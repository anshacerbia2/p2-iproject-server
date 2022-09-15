const router = require('express').Router();
const userRoutes = require('./user');
const productRoutes = require('./product');
const errorHandler = require('../middlewares/errorHandler');
const MidtransController = require('../controllers/MidtransController');

router.post('/notification', MidtransController.notification);
router.use('/products', productRoutes);
router.use(userRoutes);
router.post('/charge', MidtransController.charge);
router.use(errorHandler);

module.exports = router;