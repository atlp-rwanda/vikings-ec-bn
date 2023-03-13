'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Order extends Model {
		static associate(models) {
			this.belongsTo(models.User, { foreignKey: 'buyerId' });
      this.belongsTo(models.Payment, { foreignKey: 'paymentId' });
		}
	}
	Order.init(
		{
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
			paymentId: {
				type: DataTypes.UUID,
				references: { model: 'Payment', key: 'id' },
			},
		},
		{
			sequelize,
			modelName: 'Order',
		}
	);
	return Order;
};
