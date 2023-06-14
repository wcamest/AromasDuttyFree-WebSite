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
        path: {
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