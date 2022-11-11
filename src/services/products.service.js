const productsLayerModel = require('../models');
const validateProductsId = require('./validations/validateProductsId');

const { productsModel } = productsLayerModel;

const findAll = async () => {
  const products = await productsModel.findAllProducts();
  return { type: null, message: products };
};

const findById = async (productsId) => {
  const error = validateProductsId(productsId);
  if (error.type) return error;

  const product = await productsModel.findByProductsId(productsId);
  if (product) return { type: null, message: product };
  return { type: 404, message: 'Product not found' };
};

module.exports = {
  findAll,
  findById,
};