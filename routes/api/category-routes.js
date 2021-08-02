const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const data = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!data) {
      res
        .status(404)
        .json({ message: "There aren't any categories under this specific id." });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // creating new categories
  try {
    const data = await Category.create(req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const data = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        returning: true,
        where: {
          id: req.params.id,
        },
      }
    );
    if (!data) {
      res.status(404).json({ message: "The category id was not found and no actions were taken upon this id."});
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const data = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!data) {
      res.status(404).json({ message: "The category id was not found and nothing was deleted."});
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;