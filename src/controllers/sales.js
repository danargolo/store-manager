const { salesService } = require('../services');

const insertSale = async (req, res) => {
  const { body } = req;
  const { message } = await salesService.insertSale(body);

  return res.status(201).json(message);
};

module.exports = {
  insertSale,
};