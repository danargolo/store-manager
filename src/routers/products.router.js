const express = require('express');

const { produtsController } = require('../controllers');
const { validationProduct } = require('../middlewares/validationProduct');

const router = express.Router();

router
  .get('/', produtsController.getAll)
  .post('/', validationProduct, produtsController.insertProduct)
  .get('/:id', produtsController.getById);

module.exports = router;