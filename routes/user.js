const router = require('express').Router();
const UserController = require('../controllers/UserController');
const authentication = require('../middlewares/authentication');

const { Cart } = require('../models');

const isLoggedIn = async (request, response, next) => {
  try {
    const { access_token } = request.headers;
    if (access_token) throw { status: 400, message: 'Forbidden' };
    next();
  } catch (errors) {
    next(errors);
  }
}

router.post('/register', isLoggedIn, UserController.createUser);
router.post('/login', isLoggedIn, UserController.userLogin);
// router.post('/google-login', isLoggedIn, UserController.googleLogin);
router.use(authentication);
router.get('/carts', UserController.getCart);
router.post('/carts/:ProductId', UserController.addCart);

const deleteCartAuthorization = async (request, response, next) => {
  try {
    const UserId = request.user.id;
    const { CartId } = request.params;
    const cart = await Cart.findByPk(CartId);
    if (!cart) throw { status: 404, message: 'Data not found' };
    if (+cart.UserId !== +UserId) throw { status: 403, message: 'Forbidden' };
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

router.delete('/carts/:CartId', deleteCartAuthorization, UserController.deleteCart);


module.exports = router;