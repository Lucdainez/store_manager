const connection = require('./connection');

const addSalesId = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales () values();',
    [],
  );
  return insertId;
};

const insertSalesProducts = async (id, { productId, quantity }) => {
  await connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id,product_id, quantity) 
     VALUES (?, ?, ?);`,
    [id, productId, quantity],
  );
};

module.exports = {
  addSalesId,
  insertSalesProducts,
};