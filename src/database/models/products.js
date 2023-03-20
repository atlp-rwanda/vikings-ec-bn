'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    static associate(models) {
      this.belongsTo(models.User, { as:'seller',foreignKey: 'userId' });
      this.belongsTo(models.Categories, { foreignKey: 'categoryId' });
    }
  }
  Products.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      expiryDate: DataTypes.DATE,
      quantity: DataTypes.INTEGER,
      images: DataTypes.ARRAY(DataTypes.STRING),
      bonus: DataTypes.INTEGER,
      isExpired: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.UUID,
        references: { model: 'Categories', key: 'id' },
      },
      userId: {
        type: DataTypes.UUID,
        references: { model: 'User', key: 'id' },
      },
      wished: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'Products',
    }
  );
  return Products;
};
