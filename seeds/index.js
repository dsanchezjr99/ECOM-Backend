const seedcategories = require('./category-seeds');
const seedproducts = require('./product-seeds');
const seedtags = require('./tag-seeds');
const seedproducttags = require('./product-tag-seeds');

const sequelize = require('../config/connections');

const seedAll = async () => {

  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');


  await seedcategories();
  console.log('\n----- CATEGORIES SEEDED -----\n');


  await seedproducts();
  console.log('\n----- PRODUCTS SEEDED -----\n');


  await seedtags();
  console.log('\n----- TAGS SEEDED -----\n');


  await seedproducttags();
  console.log('\n----- PRODUCT TAGS SEEDED -----\n');

  process.exit(0);
  
};

seedAll();