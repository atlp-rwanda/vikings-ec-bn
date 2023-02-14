'use strict';
const { Model } = require('sequelize');
const { Sequelize } = require('.');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      password: DataTypes.STRING,
      gender: DataTypes.STRING,
      role: {
        type: DataTypes.STRING,
        defaultValue:'buyer'
      },
      isActive: {
				type:DataTypes.BOOLEAN,
				defaultValue: true
			},
      avatar: DataTypes.STRING,
      billingAddress: DataTypes.JSON,
      verified: DataTypes.BOOLEAN,
      birthdate: DataTypes.DATE,
      description: DataTypes.STRING,
      authCode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
