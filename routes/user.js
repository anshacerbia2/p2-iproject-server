const router = require('express').Router();
const authentication = require('../middlewares/authentication');
const UserController = require('../controllers/UserController');

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
// router.use(authentication);

module.exports = router;

