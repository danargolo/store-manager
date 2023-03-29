const { productsService } = require('../services');

const getAll = async (_req, res) => {
  const message = await productsService.getAll();

  return res.status(200).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getById(id);
  
  if (type) { return res.status(404).json({ message }); }

  return res.status(200).json(message);
};

const insertProduct = async (req, res) => {
  const { name } = req.body;

  const { message } = await productsService.insertProduct(name);

  return res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { type, message } = await productsService.getById(id);

  if (type) { return res.status(404).json({ message }); }

  const product = await productsService.updateProduct(name, id); 

  return res.status(200).json(product);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getById(id);

  if (type) { return res.status(404).json({ message }); }

  await productsService.deleteProduct(id);
 
  return res.status(204).json();
};

const getByQuery = async (req, res) => {
  const { q } = req.query;
  const data = await productsService.getByQuery(q);

  if (data.length === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json(data);
};

module.exports = {
  getAll,
  getById,
  getByQuery,
  insertProduct,
  updateProduct,
  deleteProduct,
};