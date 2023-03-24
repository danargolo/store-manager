const { productsModel } = require('../models');

const getAll = async () => {
  const products = await productsModel.getAll();
  return { message: products };
};
const getById = async (id) => {
  const [[product]] = await productsModel.getById(id);
  if (!product) {
    return {
      type: 'PRODUCT NOT FOUND', message: 'Product not found' }; 
}
    return { type: null, message: product };
};

module.exports = {
  getAll,
  getById,
};