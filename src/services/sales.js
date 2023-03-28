const { salesModel } = require('../models');

const getAll = async () => {
  const [sales] = await salesModel.getAll();

  return sales;
};

const getById = async (id) => {
  const [sale] = await salesModel.getById(id);

  if (sale.length === 0) {
    return {
      type: 'SALE NOT FOUND', message: 'Sale not found',
    };
  }
  return { type: null, message: sale };
};
 
const insertSale = async (body) => {
  const [response] = await salesModel.insertSale();
  await salesModel.insertSaleProducts(response.insertId, body);
 
  const data = {
    id: response.insertId,
    itemsSold: body,
  };

  return { type: null, message: data };
};

const deleteSale = async (id) => {
  const [response] = await salesModel.deleteSale(id);
  console.log(response, 'services');

  return response;
};

module.exports = {
  getAll,
  getById,
  insertSale,
  deleteSale,
};
