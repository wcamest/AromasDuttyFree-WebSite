const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    return sequelize.define('productPicture', {
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
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        featuredImage: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });
};