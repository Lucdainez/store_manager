const connection = require('./connection');

const findAllProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id ASC;',
  );
  return result;
};

const findByProductsId = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?;',
    [productId],
  );
  return result;
};  

module.exports = {
  findAllProducts,
  findByProductsId,
};