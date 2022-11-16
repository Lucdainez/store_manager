const salesLayerModel = require('../models');
const {
  validateQuantitys,
  validateProducts,
} = require('./validations/validateProductIdAndQuantitys');
const validateSaleId = require('./validations/validateSalesId');

const { salesModel } = salesLayerModel;

const addSalesProducts = async (products) => {
  const { type, message } = validateQuantitys(products);
  if (type) return { type: 422, message };
  const verifiedProducts = await validateProducts(products);
  if (verifiedProducts.includes(undefined)) return { type: 404, message: 'Product not found' };
  const id = await salesModel.addSalesId();
  await Promise.all(products.map(async (product) => salesModel.insertSalesProducts(id, product)));
  const result = {
      id,
      itemsSold: products,
    };
  return { type: null, message: result };
};

const requestAllSales = async () => {
  const allSales = await salesModel.requestAllSales();
  return { type: null, message: allSales };
};

const requestSaleId = async (id) => {
  const result = await salesModel.requestSaleId(id);
  const { type, message } = validateSaleId(result);
  if (type) return { type, message };
  return { type: 200, message: result };
};

module.exports = {
  addSalesProducts,
  requestAllSales,
  requestSaleId,
};