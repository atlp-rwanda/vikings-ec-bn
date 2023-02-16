'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Cart extends Model {
		static associate(models) {
			this.belongsTo(models.User, { foreignKey: 'userId' });
		}
	}
	Cart.init(
		{
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
			products: DataTypes.ARRAY(DataTypes.JSONB),
			userId: {
				type: DataTypes.UUID,
				references: { model: 'User', key: 'id' },
			},
		},
		{
			sequelize,
			modelName: 'Cart',
		}
	);
	return Cart;
};
