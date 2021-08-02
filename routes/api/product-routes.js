const router = require('express').Router();
const { product, category, tag, producttag } = require('../../models');

// gets all of the products
router.get('/', async (req, res) => {
  try {
    const data = await Product.findAll({
      include: [{ model: category }, { model: tag}],
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// gets one of the products
router.get('/:id', async (req, res) => {
  try {
    const data = await Product.findByPk(req.params.id, {
      include: [{ model: category }, { model: tag}],
    });
    if (!data) {
      res.status(404).json({ message: "No products were found under that id." });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// creating a new product
router.post('/', (req, res) => {
  
  Product.create(req.body)
    .then((product) => {
      if (req.body.tagIds.length) {
        const producttagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return producttag.bulkCreate(producttagIdArr);
      }
     
      res.status(200).json(product);
    })
    .then((producttagIds) => res.status(200).json(producttagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// updating product and its data 
router.put('/:id', (req, res) => {
  
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      return producttag.findAll({ where: { product_id: req.params.id } });
    })
    .then((producttags) => {
      
      const producttagIds = productags.map(({ tag_id }) => tag_id);
      
      const newproducttags = req.body.tagIds
        .filter((tag_id) => !producttagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      const producttagsToRemove = producttags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // runs both of the actions 
      return Promise.all([
        producttag.destroy({ where: { id: producttagsToRemove } }),
        producttag.bulkCreate(newproducttags),
      ]);
    })
    .then((updatedproducttags) => res.json(updatedproducttags))
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  try {
    const data = await product.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!data) {
      res.status(400).json({message: "The category id was not found and nothing was deleted."})
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;