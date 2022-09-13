const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const hashPw = (pw) => {
  return bcrypt.hashSync(pw, bcrypt.genSaltSync(10));
}
const comparePw = (pwInput, pwHashed) => {
  return bcrypt.compareSync(pwInput, pwHashed);
}
const jwtSign = (objPayload) => {
  return jwt.sign(objPayload, 'secret');
}
const jwtVerify = (accessToken) => {
  return jwt.verify(accessToken, 'secret');
}
module.exports = { hashPw, comparePw, jwtSign, jwtVerify };