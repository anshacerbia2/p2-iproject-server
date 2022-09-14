const jwt = require('jsonwebtoken');
const { User } = require('../models')

module.exports = async (request, response, next) => {
  try {
    const { access_token } = request.headers;
    if (!access_token) throw { status: 401, message: 'Missing Token' };
    const payload = jwt.verify(access_token, process.env.SECRET);
    const user = await User.findByPk(+payload.id);
    request.user = { id: user.id, username: user.username, email: user.email };
    next();
  } catch (errors) {
    console.log(errors);
    next(errors);
  }
};