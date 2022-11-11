const schema = require('./schema');

const { idSchema } = schema;

const validateProductsId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) {
    return { type: 'INPUT_ID', message: '"id" must be a number' };
  }
  return { type: null, message: 'OK' };
};

module.exports = validateProductsId;