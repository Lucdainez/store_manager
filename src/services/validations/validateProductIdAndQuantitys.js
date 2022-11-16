const productsLayerModel = require('../../models');

const { productsModel } = productsLayerModel;

const validateQuantitys = (quantitys) => {
  const verifyQuantitys = quantitys.map(({ quantity }) => quantity);
  if (verifyQuantitys.some((quanti) => quanti <= 0)) {
 return {
    type: 422, message: '"quantity" must be greater than or equal to 1',
  }; 
}
  return { type: null, message: 'OK' };
};

const validateProducts = async (products) => {
  const verifyProducts = Promise.all(products.map(async ({ productId }) => {
    const verifiedProductsById = await productsModel.findByProductsId(productId);
    return verifiedProductsById;
  }));
  const result = await verifyProducts;
  return result;
};

module.exports = {
  validateQuantitys,
  validateProducts,
};
