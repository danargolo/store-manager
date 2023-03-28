const express = require('express');

const { produtsController } = require('../controllers');
const { validationProducts } = require('../middlewares');

const router = express.Router();

router
  .get('/', produtsController.getAll)
  .post('/', validationProducts.product, produtsController.insertProduct)
  .get('/:id', produtsController.getById);

module.exports = router;