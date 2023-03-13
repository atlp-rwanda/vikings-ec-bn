'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {

    static associate(models) {
    }
  }
  Payment.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'Pending',
      },
    },
    {
      sequelize,
      modelName: 'Payment',
    }
  );
  return Payment;
};
