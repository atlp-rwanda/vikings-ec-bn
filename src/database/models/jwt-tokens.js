/* eslint-disable no-unused-vars */
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jwtTokens extends Model {
    static associate(models) {}
  }
  jwtTokens.init(
    {
      token: DataTypes.TEXT,
      revoked: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'jwtTokens',
    }
  );
  return jwtTokens;
};
