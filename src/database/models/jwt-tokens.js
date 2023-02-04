       
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jwtTokens extends Model {
    static associate(models) {}
  }
    jwtTokens.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        token: DataTypes.TEXT,
        revoked: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'jwtTokens',
    });
    return jwtTokens;
};
