const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const { comparePw } = require('../helpers/helpers')
const { User } = require('../models');
const { Op } = require('sequelize');

class UserController {
  static async createUser(request, response, next) {
    try {
      const { fName, lName, username, email, password, birthDate, gender, phoneNumber, address } = request.body;
      await User.create({ fName, lName, username, email, password, birthDate, gender, phoneNumber, address });
      response.status(201).json({
        message: 'Account created successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  static async userLogin(request, response, next) {
    try {
      const { email, password } = request.body;
      if (!email && !password) {
        throw {
          status: 400,
          errors: [
            {
              path: 'email',
              message: 'Email field is required'
            },
            {
              path: 'password',
              message: 'Password field is required'
            }
          ]
        }
      } else if (!email && password) {
        throw {
          status: 400,
          errors: [
            {
              path: 'email',
              message: 'Email field is required'
            }
          ]
        }
      } else if (email && !password) {
        throw {
          status: 400,
          errors: [
            {
              path: 'password',
              message: 'Password field is required'
            }
          ]
        }
      }
      const user = await User.findOne({ where: { email: { [Op.eq]: email } } });
      if (!user) throw ({ status: 401, message: 'Invalid email or password' });
      const validPassword = comparePw(password, user.password);
      if (!validPassword) throw ({ status: 401, message: 'Invalid email or password' });
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET);
      response.status(200).json({
        statusCode: 200,
        message: 'Login success',
        access_token: token,
        user: {
          id: user.id,
          fName: user.fName,
          lName: user.lName,
          username: user.username,
          email: user.email,
          birthDate: user.birthDate,
          gender: user.gender,
          phoneNumber: user.phoneNumber,
          address: user.address,
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(request, response, next) {
    try {
      const { gToken } = request.body;
      const client = new OAuth2Client(process.env.CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: gToken,
        audiance: process.env.CLIENT_ID
      }); // jwt.verify
      const payload = ticket.getPayload();
      const data = await User.findOrCreate({
        where: { email: { [Op.eq]: payload.email } },
        hooks: false,
        defaults: {
          username: payload.name.toLowerCase().replace(' ', ''),
          email: payload.email,
          password: 'googlePassword',
          role: 'staff',
        }
      });
      const user = { id: +data[0].dataValues.id, username: data[0].dataValues.username, role: data[0].dataValues.role }
      const access_token = jwt.sign(user, process.env.SECRET);
      response.status(200).json({
        statusCode: 200,
        message: 'User logged in successfully',
        access_token,
        user
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;