const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('productPicture', {
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
        }
    });
};