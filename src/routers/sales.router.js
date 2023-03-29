const express = require('express');
const { salesController } = require('../controllers');
const { validationSales } = require('../middlewares');

const router = express.Router();

router
  .get('/', salesController.getAll)
  .get('/:id', salesController.getById)
  .post('/', validationSales.sale, validationSales.saleProductId, salesController.insertSale)
  .delete('/:id', salesController.deleteSale)
  .put('/:id', validationSales.sale, validationSales.saleProductId, salesController.updateSale);

module.exports = router;