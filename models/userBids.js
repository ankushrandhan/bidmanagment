/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
    const userBids = sequelize.define('userBids', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        userId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'user_id',
        },
        projectId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'project_id',
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            field: 'price',
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'description',
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
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
        tableName: 'user_bids',
    });
    userBids.associate = models => {
	    userBids.belongsTo(models.projects, { foreignKey: 'projectId',hooks: false});
        userBids.belongsTo(models.userDetails, { foreignKey: 'userId',targetKey: 'userId',hooks: false});
	}
    return userBids;
};
