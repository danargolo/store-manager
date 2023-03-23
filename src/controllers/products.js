const { productsService } = require('../services');

const getAll = async (_req, res) => {
  const { status, message } = await productsService.getAll();

  return res.status(status).json(message);
};
const getById = async (req, res) => {
  const { id } = req.params;
  const { error, message } = await productsService.getById(id);
  
  if (error) { return res.status(error).json({ message }); }

  return res.status(200).json(message);
};

module.exports = {
  getAll,
  getById,
};