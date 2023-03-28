const express = require('express');
const { salesController } = require('../controllers');
const { validationSales } = require('../middlewares');

const router = express.Router();

router
  .post('/', validationSales.sale, validationSales.saleProductId, salesController.insertSale);

module.exports = router;