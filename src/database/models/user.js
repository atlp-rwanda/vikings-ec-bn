'use strict';
const { Model } = require('sequelize');
const { Sequelize } = require('.');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
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
      email: {
        type:DataTypes.STRING,
        unique: true,
      },
      phone: DataTypes.STRING,
      password: DataTypes.STRING,
      gender: DataTypes.STRING,
      role: {
        type: DataTypes.STRING,
        defaultValue: 'buyer',
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      usesPassword:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
      },
      avatar: DataTypes.STRING,
      billingAddress: DataTypes.JSON,
      verified: DataTypes.BOOLEAN,
      birthdate: DataTypes.DATE,
      description: DataTypes.STRING,
      authCode: DataTypes.STRING,
      mustUpdatePassword:{
          type: DataTypes.BOOLEAN,
          defaultValue:false
      },
      lastTimePasswordUpdated:DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
