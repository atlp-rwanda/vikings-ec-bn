'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ratings extends Model {
    static associate(models) {
      this.belongsTo(models.Products, { foreignKey: 'productId' });
      this.belongsTo(models.User, { as: 'buyer', foreignKey: 'buyerId' });
    }
  }
  Ratings.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      buyerId: {
        type: DataTypes.UUID,
        references: { model: 'User', key: 'id' },
    },
    productId: {
        type: DataTypes.UUID,
        references: { model: 'Products', key: 'id' },
    },
      rate:  DataTypes.INTEGER,
      feedback: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Ratings',
    }
  );
  return Ratings;
};