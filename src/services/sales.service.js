const salesLayerModel = require('../models');
const {
  validateQuantitys,
  validateProducts,
} = require('./validations/validateProductIdAndQuantitys');

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

module.exports = {
  addSalesProducts,
};