const { salesModel } = require('../models');

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
  insertSale,
};
