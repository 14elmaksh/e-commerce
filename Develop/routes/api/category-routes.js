const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({include: [{model: Product, as: 'products'}]})
  .then( categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err);
    res.sendStatus(500);
  })
});


router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {id: req.params.id},
    include: [{model: Product, as: 'products'}]})
  .then( categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err);
    res.sendStatus(500).json(err);
  })

});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(newCategoryData => res.json(newCategoryData))
  .catch(err => {
    console.log(err);
    res.sendStatus(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where:{id: req.params.id}
  })
  .then(updatedCategory => {
    if(!updatedCategory[0]){
      res.sendStatus(404).json({message: 'No Category with this ID.'});
      return;
    }
    res.json(updatedCategory);
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: { id: req.params.id}
  })
  .then( deletedCategory => {
    if(!deletedCategory){
      res.sendStatus(404).json({message: 'No Category with this ID.'});
      return;
    }
    res.json(deletedCategory);
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(500).json(err);
  })
});

module.exports = router;
