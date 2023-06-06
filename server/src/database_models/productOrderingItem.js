const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('productOrderingItem', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            validate: {
                isUUID: 4,
            }
        },
        count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
};