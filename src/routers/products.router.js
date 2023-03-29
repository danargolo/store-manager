const express = require('express');

const { productsController } = require('../controllers');
const { validationProducts } = require('../middlewares');

const router = express.Router();

router
  .get('/', productsController.getAll)
  .get('/search', productsController.getByQuery)
  .get('/:id', productsController.getById)
  .post('/', validationProducts.product, productsController.insertProduct)
  .put('/:id', validationProducts.product, productsController.updateProduct)
  .delete('/:id', productsController.deleteProduct);

module.exports = router;