const { productsModel } = require('../models');

const getAll = async () => {
  try {
    const products = await productsModel.getAll();
    return { status: 200, message: products };
  } catch (error) {
    console.log(error);
  }
};
const getById = async (id) => {
  try {
    const [[product]] = await productsModel.getById(id);
    if (!product) {
      return {
        error: 404, message: 'Product not found' }; 
}
    return { message: product };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAll,
  getById,
};