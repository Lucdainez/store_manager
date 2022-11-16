module.exports = (result) => {
  if (result.length === 0) {
    return { type: 404, message: 'Sale not found' };
  }
  return { type: null, message: 'OK' };
};