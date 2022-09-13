'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductSubCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductSubCategory.belongsTo(models.ProductCategory);
      ProductSubCategory.hasMany(models.ProductSubSubCategory);
    }
  }
  ProductSubCategory.init({
    name: DataTypes.STRING,
    ProductCategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductSubCategory',
  });
  return ProductSubCategory;
};