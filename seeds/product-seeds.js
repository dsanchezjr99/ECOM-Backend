const { product } = require('../models');

const productData = [
  {
    product_name: 'Plain T-Shirt',
    price: 12.99,
    stock: 14,
    category_id: 1,
  },

  {
    product_name: 'Jordan 1 Sneakers',
    price: 180.00,
    stock: 25,
    category_id: 5,
  },

  {
    product_name: 'Yankee Baseball Fitted',
    price: 27.99,
    stock: 12,
    category_id: 4,
  },

  {
    product_name: 'Kendrick Lamar Vinyl',
    price: 19.99,
    stock: 55,
    category_id: 3,
  },

  {
    product_name: 'Slacks',
    price: 25.99,
    stock: 25,
    category_id: 2,
  },
  
];

const seedproducts = () => product.bulkCreate(productData);

module.exports = seedproducts;