require('dotenv').config();
const { Sequelize, Op } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
    DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
    logging: false,
    native: false
});
const basename = path.basename(__filename);

const modelDefiners = [];

//Lectura de archivos
fs.readdirSync(path.join(__dirname, '/database_models'))
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, '/database_models', file)));
    });

//Injección de modelos
modelDefiners.forEach(model => model(sequelize));

//Capitalizar Nombre de Modelos
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

//Desestructurado de modelos
const { User, UserPassword, ShippingAddress, Promotion, ProductPicture, ProductInventory, Product, Order, ProductOrderingItem } = sequelize.models;

//Un usuario puede tener muchas direcciónes de envio
//Una dirección de envio pertenece a un solo usuario
User.hasMany(ShippingAddress, { as: 'shippingAddresses', foreignKey: 'userId' });
ShippingAddress.belongsTo(User);

//Un usuaro puede tener muchas contraseñas (solo una activa)
//Una contraseña pertenece a un solo usuario
User.hasMany(UserPassword, { as: 'passwords', foreignKey: 'userId' });
UserPassword.belongsTo(User);

//Un usuario puede hacer muchos pedidos
//Un pedido pertenece a un solo usuario
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User);

//Un pedido puede contener muchos items de productos
//Un item de producto pertenece a un solo pedido
Order.hasMany(ProductOrderingItem, { as: 'productItems', foreignKey: 'orderId' });
ProductOrderingItem.belongsTo(Order);

//Un item de producto hace referencia a un solo producto
//Un producto puede ser referenciado por muchos items de producto
ProductOrderingItem.hasOne(Product);
Product.hasMany(ProductOrderingItem);

//Un producto puede tener mas de una imagen
//Una imagen pertenece a un solo producto
Product.hasMany(ProductPicture, { as: 'pictures', foreignKey: 'productId' });
ProductPicture.belongsTo(Product);

//Un item de inventario hace referencia a un solo producto
//Un solo producto es referenciado por un solo item de inventario
ProductInventory.hasOne(Product, { foreignKey: 'productId' });
Product.belongsTo(ProductInventory, { foreignKey: 'productInventoryId' });

//En una promoción se pueden incluir muchos productos
//Un producto pertenece a una sola promoción
Promotion.hasMany(Product, { foreignKey: 'productId' });
Product.belongsTo(Promotion, { foreignKey: 'promotionId' });

module.exports = {
    ...sequelize.models,
    databaseConnection: sequelize
};
