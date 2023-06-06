const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('promotion', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            validate: {
                isUUID: 4,
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        filters: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        priceRange: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        discount: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    });
};