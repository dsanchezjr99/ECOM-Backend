const { category } = require('../models');

const categoryData = [
  {
    category_name: 'Sneakers',
  },
  {
    category_name: 'Shorts',
  },
  {
    category_name: 'Albums',
  },
  {
    category_name: 'Headwear',
  },
  {
    category_name: 'TShirts',
  },
];

const seedCategories = () => category.bulkCreate(categoryData);

module.exports = seedCategories;