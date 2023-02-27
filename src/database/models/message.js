'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      Message.belongsTo(models.User, { as: 'sender', foreignKey: 'senderId' });
    }
  }
  Message.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      senderId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: sequelize.models.User,
          key: 'id',
        },
      },
      message: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Message',
    }
  );
  return Message;
};
