const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    return sequelize.define('product', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            validate: {
                isUUID: 4,
            }
        },
        productReference: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        filters: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        salePrice: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    });
};