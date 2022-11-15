module.exports = async (sales) => {
  const verifingSales = await Promise.all(sales.map(({ productId, quantity }) => {
    if (productId === undefined) {
      return 'invalid productId';
    }
    if (quantity === undefined) {
      return 'invalid quantity';
    }
    return 'ok';
  }));
  return verifingSales;
};
