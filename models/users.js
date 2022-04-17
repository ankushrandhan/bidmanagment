/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	const users = sequelize.define('users', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'email',
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'password',
		},
		token: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'token',
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull:false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'created_at'
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'updated_at'
		}
	}, {
		tableName: 'users',
	});
	return users;
};
