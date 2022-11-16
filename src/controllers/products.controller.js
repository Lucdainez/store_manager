const productsLayerService = require('../services');

const { productsService } = productsLayerService;

const listProducts = async (_req, res) => {
  const { type, message } = await productsService.findAll();
  if (type) return res.status(404).json({ message: 'error' });
  return res.status(200).json(message);
};

const getProductId = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService
    .findById(Number(id));
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

const addProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService
    .addProduct(name);
  if (type) return res.status(type).json({ message });
  return res.status(201).json(message);
};

const setProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productsService
    .setProduct(name, id);
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  listProducts,
  getProductId,
  addProduct,
  setProduct,
};