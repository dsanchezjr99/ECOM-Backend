const router = require('express').Router();
const { tag, product, producttag } = require('../../models');

router.get('/', async (req, res) => {
  
  try {
    const data = await tag.findAll({
      include: [{ model: product }],
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  
  try {
    const data = await tag.findByPk(req.params.id, {
      include: [{ model: product }],
    });
    if (!data) {
      res
        .status(404)
        .json({ message: "No tags under this id currently exist." });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // creating new tags
  try {
    const data = await tag.create(req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const data = await tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        returning: true,
        where: {
          id: req.params.id,
        },
      }
    );
    if (!data) {
      res
        .status(404)
        .json({ message: "the id tag was not found and no actions were performed." });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const data = await tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(data);

    if (!data) {
      res
        .status(404)
        .json({
          message: "The category id was not found and nothing was deleted.",
        });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;