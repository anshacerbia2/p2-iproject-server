'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductSubSubCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductSubSubCategory.belongsTo(models.ProductSubCategory)
      ProductSubSubCategory.hasMany(models.Product);
    }
  }
  ProductSubSubCategory.init({
    name: DataTypes.STRING,
    ProductSubCategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductSubSubCategory',
  });
  return ProductSubSubCategory;
};