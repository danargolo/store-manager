const { salesModel } = require('../models');

const getAll = async () => {
  const [sales] = await salesModel.getAll();
  console.log(sales);
  return sales;
};

const getById = async (id) => {
  const [sale] = await salesModel.getById(id);
  console.log(sale);
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

module.exports = {
  getAll,
  getById,
  insertSale,
};
