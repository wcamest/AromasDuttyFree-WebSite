const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('userPassword', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            validate: {
                isUUID: 4,
            }
        },
        current: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};