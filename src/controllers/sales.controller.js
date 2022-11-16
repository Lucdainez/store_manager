const salesLayerService = require('../services');
const validateSales = require('../middlewares/validateSales.middleware');

const { salesService } = salesLayerService;

const addSales = async (req, res) => {
  const sales = req.body;
  const result = await validateSales(sales);
  const successResult = result.every((status) => status === 'ok');
  if (successResult) {
    const { type, message } = await salesService.addSalesProducts(sales);
    if (type) return res.status(type).json({ message });
    return res.status(201).json(message);
  } 
  if (result.includes('invalid productId')) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  if (result.includes('invalid quantity')) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
};

const requestAllSales = async (_req, res) => {
  const { message } = await salesService.requestAllSales();
  return res.status(200).json(message);
};

const requestSaleId = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.requestSaleId(id);
  if (type === 404) {
    return res.status(type).json({ message });  
  }
  return res.status(type).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.deleteSale(id);
  if (type) return res.status(type).json({ message });
  return res.status(204).end();
};

module.exports = {
  addSales,
  requestAllSales,
  requestSaleId,
  deleteSale,
};