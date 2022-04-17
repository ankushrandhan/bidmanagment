/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
    const projects = sequelize.define('projects', {
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
        title: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'title',
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'description',
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            field: 'price',
        },
        bidStartTime: {
            type: DataTypes.TIME,
            allowNull: false,
            field: 'bid_start_time',
        },
        bidEndTime: {
            type: DataTypes.TIME,
            allowNull: false,
            field: 'bid_end_time',
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
        tableName: 'projects',
    });
    projects.associate = models => {
	    projects.belongsTo(models.userDetails, { foreignKey: 'userId',targetKey: 'userId',hooks: false});
        projects.hasMany(models.userBids, { foreignKey: 'projectId',hooks: false});
	}

    return projects;
};
