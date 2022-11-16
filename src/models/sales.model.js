const camelize = require('camelize');
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

const requestAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT 
    products.sale_id,
    sales.date,
    products.product_id,
    products.quantity
    FROM
    StoreManager.sales AS sales
    INNER JOIN
    StoreManager.sales_products AS products ON sales.id = products.sale_id
    ORDER BY products.sale_id ASC , products.product_id ASC;`,
  );
  return camelize(result);
};

const requestSaleId = async (id) => {
  const [result] = await connection.execute(
    `SELECT 
    sales.date,
    products.product_id,
    products.quantity
    FROM
    StoreManager.sales AS sales
    INNER JOIN
    StoreManager.sales_products AS products ON sales.id = products.sale_id 
    WHERE products.sale_id = ?
    ORDER BY products.sale_id ASC , products.product_id ASC;`,
    [id],
  );
  return camelize(result);
};

const deleteSale = async (id) => {
  await connection.execute(
    `DELETE FROM StoreManager.sales_products
    WHERE sale_id =  ?;`,
    [id],
  );
  await connection.execute(
    `DELETE FROM StoreManager.sales
    WHERE id =  ?;`,
    [id],
  );
};

module.exports = {
  addSalesId,
  insertSalesProducts,
  requestAllSales,
  requestSaleId,
  deleteSale,
};