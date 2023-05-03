'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Search extends Model {
    static associate(models) {
      this.belongsTo(models.User, { as:'buyer',foreignKey: 'buyerId' });    }
  }
  Search.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    buyerId: DataTypes.UUID,
    products: DataTypes.ARRAY(DataTypes.UUID)
  }, {
    sequelize,
    modelName: 'Search',
  });
  return Search;
};