const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('productInventory', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            validate: {
                isUUID: 4,
            }
        },
        purchasePrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        salePrice: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        barcode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        provider: {
            type: DataTypes.STRING,
            allowNull: false
        },
        additionalNotes: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
};