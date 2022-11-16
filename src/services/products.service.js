const productsLayerModel = require('../models');
const { validateProductsId, validateNewProduct } = require('./validations/validateProducts');

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

const addProduct = async (product) => {
  const error = validateNewProduct(product);
  if (error.type) return error;

  const newProductId = await productsModel.insertOneProduct(product);
  const newProduct = await productsModel.findByProductsId(newProductId);
  return { type: null, message: newProduct };
};

const setProduct = async (name, id) => {
  const error = validateNewProduct(name);
  if (error.type) return error;
  const result = await productsModel.updateProduct(name, id);
  if (!result) return { type: 404, message: 'Product not found' };
  return { type: null, message: result };
};

module.exports = {
  findAll,
  findById,
  addProduct,
  setProduct,
};