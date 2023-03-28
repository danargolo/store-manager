const express = require('express');
const { salesController } = require('../controllers');
const { validationSales } = require('../middlewares');

const router = express.Router();

router
  .get('/', salesController.getAll)
  .get('/:id', salesController.getById)
  .post('/', validationSales.sale, validationSales.saleProductId, salesController.insertSale);

module.exports = router;