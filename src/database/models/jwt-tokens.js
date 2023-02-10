'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class jwtTokens extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    jwtTokens.init({
        token: DataTypes.TEXT,
        revoked: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'jwtTokens',
    });
    return jwtTokens;
};