const { salesService } = require('../services');

const getAll = async (_req, res) => {
  const message = await salesService.getAll();
  console.log(message);
  return res.status(200).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getById(id);

  if (type) { return res.status(404).json({ message }); }

  return res.status(200).json(message);
};

const insertSale = async (req, res) => {
  const { body } = req;
  const { message } = await salesService.insertSale(body);

  return res.status(201).json(message);
};

module.exports = {
  getAll,
  getById,
  insertSale,
};