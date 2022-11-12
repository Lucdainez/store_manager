const schema = require('./schema');

const { idSchema, addProductSchema } = schema;

const validateProductsId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INPUT_ID', message: '"id" must be a number' };
  return { type: null, message: 'OK' };
};

const validateNewProduct = (productName) => {
  const { error } = addProductSchema.validate(productName);
  if (error) return { type: 422, message: '"name" length must be at least 5 characters long' };
  return { type: null, message: 'OK' };
};

module.exports = {
  validateProductsId,
  validateNewProduct,
};