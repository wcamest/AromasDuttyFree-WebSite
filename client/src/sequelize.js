require("dotenv").config();
const { Sequelize } = require('sequelize');

const productModel = require("./models/Product");
const productImageModel = require("./models/ProductImage");
const productFilterModel = require("./models/ProductFilter");

const {DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT} = process.env;

console.log(DB_NAME);

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  dialectModule: require('pg')
});

const Product = productModel(sequelize);
const ProductImage = productImageModel(sequelize);
const ProductFilter = productFilterModel(sequelize);

Product.hasMany(ProductImage, {as: 'images', foreignKey: 'productId', onDelete:'cascade', hooks: true});
ProductImage.belongsTo(Product, {as: 'product'});

ProductFilter.hasMany(ProductFilter, {as: 'subFilters', foreignKey: 'parentId', onDelete:'cascade', hooks: true});
ProductFilter.belongsTo(ProductFilter, {as: 'parent'});

module.exports = {
  databaseConnection: sequelize,
  Product,
  ProductImage,
  ProductFilter
};