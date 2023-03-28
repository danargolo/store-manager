const connection = require('./connection');

const insertSale = async () => {
  const QUERY = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
  const response = await connection.execute(QUERY);

  return response;
};
const insertSaleProducts = async (id, body) => {
  const QUERY = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) 
    VALUES (?, ?, ?);`;
  
  Promise.all(body.map(async (p) => {
    await connection.execute(QUERY, [id, p.productId, p.quantity]);
  }));

  return true;
};

module.exports = {
  insertSale,
  insertSaleProducts,
};