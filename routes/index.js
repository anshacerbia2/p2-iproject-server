const router = require('express').Router();
const userRoutes = require('./user');
const productRoutes = require('./product');
const errorHandler = require('../middlewares/errorHandler');
const MidtransController = require('../controllers/MidtransController');
const axios = require('axios');

const x = (request, response, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
};

router.post('/notification', x, MidtransController.notification);
router.get('/courier-provinces', async (request, response, next) => {
  try {
    const data = await axios.get('https://emsifa.github.io/api-wilayah-indonesia/api/provinces.json');
    response.status(200).json(data.data);
  } catch (error) {
    console.log(error);
    next(error)
  }
});
router.get('/courier-cities/:provinceId', async (request, response, next) => {
  try {
    const data = await axios.get(`https://emsifa.github.io/api-wilayah-indonesia/api/regencies/${request.params.provinceId}.json`);
    response.status(200).json(data.data);
  } catch (error) {
    console.log(error);
    next(error)
  }
});
router.use('/products', productRoutes);
router.use(userRoutes);
router.post('/charge', MidtransController.charge);
router.use(errorHandler);

module.exports = router;