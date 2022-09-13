const { Product } = require('../models');
const { Op } = require('sequelize');

class ProductController {
  static async get(request, response, next) {
    try {
      const products = await Product.findAll();
      response.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }


}

module.exports = ProductController;