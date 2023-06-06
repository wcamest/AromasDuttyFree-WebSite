const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('shippingAddress', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            validate: {
                isUUID: 4,
            }
        },
        userIDNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        department: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        address: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    });
};