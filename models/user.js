'use strict';
const { Model } = require('sequelize');
const { hashPw } = require('../helpers/helpers');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Product);
      User.hasMany(models.Cart);
    }

    get fullName() {
      return this.fName + ' ' + this.lName;
    }
  }
  User.init({
    fName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'First Name field is required' },
        notEmpty: { msg: 'First Name field is required' },
      }
    },
    lName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Last Name field is required' },
        notEmpty: { msg: 'Last Name field is required' },
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Username field is required' },
        notEmpty: { msg: 'Username field is required' },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Email field is required' },
        notEmpty: { msg: 'Email field is required' },
        isEmail: {
          args: true,
          msg: 'Please input valid email'
        }
      },
      unique: {
        args: true,
        msg: 'Email address already in use!'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Password field is required' },
        notEmpty: { msg: 'Password field is required' },
        len: {
          args: [5],
          msg: "Password at least 5 character"
        }
      }
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: 'Birth Date field is required' },
        notEmpty: { msg: 'Birth Date field is required' },
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Gender field is required' },
        notEmpty: { msg: 'Gender field is required' },
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Phone Number field is required' },
        notEmpty: { msg: 'Phone Number field is required' },
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'City field is required' },
        notEmpty: { msg: 'City field is required' },
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user) {
        user.password = hashPw(user.password);
      }
    }
  });
  return User;
};