const { Product, User } = require('../models');
const { Op } = require('sequelize');

class ProductController {
  static async product(request, response, next) {
    try {
      const id = +request.params.id
      const product = await Product.findByPk(id, { include: User });
      response.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async products(request, response, next) {
    try {
      const products = await Product.findAll({ include: User });
      response.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }



}

module.exports = ProductController;