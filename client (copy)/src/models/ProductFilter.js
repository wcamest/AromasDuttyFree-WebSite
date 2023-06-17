const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    return sequelize.define('productFilter', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            validate: {
                isUUID: 4,
            }
        },
        filterName: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
};