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

const insertOneProduct = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?);',
    [product],
  );
  return insertId;
};

const updateProduct = async (name, id) => {
  await connection.execute(
    `UPDATE StoreManager.products
    SET name = ?
    WHERE id = ?;`,
    [name, id],
  );

  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?;',
    [id],
  );
  return result;
};

const deleteProduct = async (id) => {
  await connection.execute(
    `DELETE FROM StoreManager.products
    WHERE id = ?;`,
    [id],
  );
};

module.exports = {
  findAllProducts,
  findByProductsId,
  insertOneProduct,
  updateProduct,
  deleteProduct,
};