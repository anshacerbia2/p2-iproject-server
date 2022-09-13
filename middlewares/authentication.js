const jwt = require('jsonwebtoken');
const { User } = require('../models')

module.exports = async (request, response, next) => {
  try {
    const { access_token } = request.headers;
    if (!access_token) throw { status: 400, message: 'Missing Token' };
    const payload = jwt.verify(access_token, process.env.SECRET);
    const user = await User.findByPk(+payload.id);
    // if (!user) throw { name: 'JsonWebTokenError', message: 'Invalid Token' };
    request.user = { id: user.id, username: user.username, email: user.email };
    next();
  } catch (errors) {
    next(errors);
  }
};