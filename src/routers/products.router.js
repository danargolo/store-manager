const express = require('express');

const { produtsController } = require('../controllers');
const { validationProducts } = require('../middlewares');

const router = express.Router();

router
  .get('/', produtsController.getAll)
  .get('/:id', produtsController.getById)
  .post('/', validationProducts.product, produtsController.insertProduct)
  .put('/:id', validationProducts.product, produtsController.updateProduct);

module.exports = router;