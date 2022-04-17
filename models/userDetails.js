/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	const userDetails = sequelize.define('userDetails', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		userId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'user_id',
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'name',
		},
		image: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'image',
		},
		countryCode: {
			type: DataTypes.CHAR(3),
			allowNull: false,
			field: 'country_code',
		},
		phone: {
			type: DataTypes.BIGINT(20),
			allowNull: false,
			field: 'phone',
		},
        gender: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'gender',
		},
		address: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'address',
		},
		latitude: {
			type: DataTypes.DECIMAL(8,6),
			allowNull: true,
			field: 'latitude',
		},
		longitude: {
			type: DataTypes.DECIMAL(9,6),
			allowNull: true,
			field: 'longitude',
		},
		deviceType: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'device_type',
		},
		deviceToken: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'device_token',
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'created_at'
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'updated_at'
		}
	}, {
		tableName: 'user_details',
	});
	return userDetails;
};
