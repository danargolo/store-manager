const connection = require('./connection');

const getAll = async () => {
  const QUERY = 'SELECT * FROM StoreManager.products';
  const [response] = await connection.execute(QUERY);

  return response;
};
const getById = async (id) => {
  const QUERY = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const response = await connection.execute(QUERY, [id]);

  return response;
};

module.exports = {
  getAll,
  getById,
};