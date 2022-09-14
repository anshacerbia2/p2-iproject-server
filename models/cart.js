'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User);
      Cart.belongsTo(models.Product);
    }
  }
  Cart.init({
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Amount field is required' },
        notEmpty: { msg: 'Amount field is required' },
        min: {
          args: 1,
          msg: 'Minimum amount is 1'
        }
      },
    },
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};