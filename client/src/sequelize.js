const { Sequelize } = require('sequelize');

const productModel = require("./models/Product");
const productImageModel = require("./models/ProductImage");
const productFilterModel = require("./models/ProductFilter");

const sequelize = new Sequelize('aromasdutyfree_db', 'postgres', 'wceo1228', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  dialectModule: require('pg')
});

const Product = productModel(sequelize);
const ProductImage = productImageModel(sequelize);
const ProductFilter = productFilterModel(sequelize);

Product.hasMany(ProductImage, {as: 'images', foreignKey: 'productId'});
ProductImage.belongsTo(Product);

ProductFilter.hasMany(ProductFilter, {as: 'subFilters', foreignKey: 'parentId'});
ProductFilter.belongsTo(ProductFilter, {as: 'parent'});

module.exports = {
  databaseConnection: sequelize,
  Product,
  ProductImage,
  ProductFilter
};