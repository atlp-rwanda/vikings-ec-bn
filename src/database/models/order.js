'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'buyerId' });
    }
  }
  Order.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
    buyerId: {
      type: DataTypes.UUID,
      references: { model: 'User', key: 'id' },
    },
    products: DataTypes.ARRAY(DataTypes.JSONB),
    fullPrice: DataTypes.INTEGER,
    shippingAddress: DataTypes.JSONB
  }, 
  {
    sequelize,
    modelName: 'Orders',
  });
  return Order;
};