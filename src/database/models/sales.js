'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sales extends Model {
    static associate(models) {
      this.belongsTo(models.Order, {foreignKey: 'orderId'});
      this.belongsTo(models.Products, {foreignKey: 'productId'});
    }
  }
  Sales.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true,
    },
    orderId: {
      type: DataTypes.UUID,
      references: { model: 'Order', key: 'id' },
    },
    productId: {
      type: DataTypes.UUID,
      references: { model: 'Products', key: 'id' },
    },
    status: DataTypes.STRING,
    quantitySold: DataTypes.STRING,
    expectedDeliveryDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Sales',
  });
  return Sales;
};
