const connection = require('./connection');

const getAll = async () => {
  const QUERY = 'SELECT * FROM StoreManager.products;';
  const response = await connection.execute(QUERY);

  return response;
};
const getById = async (id) => {
  const QUERY = 'SELECT * FROM StoreManager.products WHERE id = ?;';
  const response = await connection.execute(QUERY, [id]);

  return response;
};
const insertProduct = async (name) => {
  const QUERY = 'INSERT INTO StoreManager.products (name) VALUES (?);';
  const response = await connection.execute(QUERY, [name]);

  return response;
};

const updateProduct = async (name, id) => {
  const QUERY = 'UPDATE StoreManager.products SET name = ? WHERE id = ?;';
  const response = await connection.execute(QUERY, [name, id]);
  
  return response;
};

const deleteProduct = async (id) => {
  const QUERY = 'DELETE FROM StoreManager.products WHERE id = ?;';
  const response = await connection.execute(QUERY, [id]); 

  return response;
};

const getByQuery = async (query) => {
  const QUERY = 'SELECT * FROM StoreManager.products WHERE name LIKE ? ;';
  const response = await connection.execute(QUERY, [query]);

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