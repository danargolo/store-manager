const { salesService } = require('../services');

const getAll = async (_req, res) => {
  const message = await salesService.getAll();

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

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getById(id);
  
  if (type) { return res.status(404).json({ message }); }

  await salesService.deleteSale(id);

  return res.status(204).json();
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { type, message } = await salesService.updateSale(id, body);

  if (type) { return res.status(404).json({ message }); }

  return res.status(200).json(message);
};

module.exports = {
  getAll,
  getById,
  insertSale,
  deleteSale,
  updateSale,
};