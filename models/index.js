const Product = require('./product');
const Category = require('./category');
const Tag = require('./tag');
const ProductTag = require('./producttag');

// Products that belong to each category
Product.belongsTo(Category)

// Categories that have more than one Product in them
Category.hasMany(Product, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
})


Product.belongsToMany(Tag, {
  through: ProductTag,
});

Tag.belongsToMany(Product, {
  through: ProductTag,
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};