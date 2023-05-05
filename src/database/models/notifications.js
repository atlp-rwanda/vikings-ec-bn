'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Notifications extends Model {
        static associate(models) {
            Notifications.belongsTo(models.User, { as: 'receiver', foreignKey: 'receiverId' });
        }
    }
    Notifications.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            isRead: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            receiverId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: sequelize.models.User,
                    key: 'id',
                },
            },
            message: DataTypes.STRING,
            type: DataTypes.STRING,

        },
        {
            sequelize,
            modelName: 'Notification',
        }
    );
    return Notifications;
};
