const { productsModel } = require('../models');

const getAll = async () => {
  const [products] = await productsModel.getAll();
  return products;
};
const getById = async (id) => {
  const [[product]] = await productsModel.getById(id);
  if (!product) {
    return {
      type: 'PRODUCT NOT FOUND', message: 'Product not found' }; 
}
    return { type: null, message: product };
};
const insertProduct = async (name) => {
  const [products] = await productsModel.insertProduct(name);
  const response = {
    id: products.insertId,
    name,
  };

  return { type: null, message: response };
};

const updateProduct = async (name, id) => {
  await productsModel.updateProduct(name, id);
  const response = {
    id,
    name,
  };
  return response;
};

const deleteProduct = async (id) => {
  const [response] = await productsModel.deleteProduct(id);

  return response;
};

const getByQuery = async (q) => {
  const queryAdapted = `%${q}%`;
  const [response] = await productsModel.getByQuery(queryAdapted);

  return response;
};

module.exports = {
  getAll,
  getById,
  insertProduct,
  updateProduct,
  deleteProduct,
  getByQuery,
};