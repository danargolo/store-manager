const express = require('express');

const { produtsController } = require('../controllers');

const router = express.Router();

router.get('/', produtsController.getAll);

router.get('/:id', produtsController.getById);

module.exports = router;