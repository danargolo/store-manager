const connection = require('./connection');

const getAll = async () => {
  const QUERY = `SELECT s.id AS saleId, 
                        s.date, 
                        sp.product_id AS productId, 
                        sp.quantity
                    FROM StoreManager.sales AS s 
                    INNER JOIN StoreManager.sales_products AS sp 
                    ON s.id = sp.sale_id
                    ORDER BY s.id, sp.product_id;`;
  
  const response = await connection.execute(QUERY);

  return response;
};

const getById = async (id) => {
  const QUERY = `SELECT s.date, 
                        sp.product_id AS productId, 
                        sp.quantity
                    FROM StoreManager.sales AS s 
                    INNER JOIN StoreManager.sales_products AS sp 
                    ON s.id = sp.sale_id
                    WHERE s.id = ?
                    ORDER BY s.id, sp.product_id;`;
  
  const response = await connection.execute(QUERY, [id]);

  return response;
};

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
  getAll,
  getById,
  insertSale,
  insertSaleProducts,
};